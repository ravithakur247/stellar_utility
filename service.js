const stellar = require('stellar-sdk');
const fetch = require('node-fetch');
const _ = require('lodash');


stellar.Network.useTestNetwork();

const createStellarAccount = async (data) => {
    try {
        const {
            publicKey,
            secretKey,
            startingBalance,
            stellarIp,
            fee,
            timeOut
        } = data;
        const server = new stellar.Server(stellarIp);
        let pair = await keypair(stellar);
        let account = await findAccount(publicKey, server);
        if (!account) return;
        let transaction = new stellar.TransactionBuilder(account, opts = {
            fee: fee
        })
            .addOperation(stellar.Operation.createAccount({
                destination: pair.key,
                startingBalance: startingBalance

            })).setTimeout(timeOut)
            .build();

        if (!transaction) return;
        let sourceKeypairObject = await keypairFromSecret(secretKey, stellar);

        transaction.sign(sourceKeypairObject);
        if (!sourceKeypairObject) return;
        let transactionData = await server.submitTransaction(transaction);
        if (!transactionData) return;
        return pair;
    } catch (exception) {
        console.log(exception);
        throw new Error(exception.message)
    }
}

const getBalance = async (data) => {
    try {
        const {
            publicKey,
            stellarIp
        } = data;
        const server = new stellar.Server(stellarIp);
        let _balanceData = await findAccount(publicKey, server);
        if (!_balanceData) return;
        return _balanceData.balances[0].balance;
    } catch (exception) {
        throw new Error(exception)
    }
}

const fetchTransaction = async (data) => {

    try {
        const {
            stellarIp,
            hash
        } = data;
        const server = new stellar.Server(stellarIp);
        let _transactionData = await transactionByHash(hash, server);
        if (!_transactionData) return;
        return _transactionData;
    } catch (exception) {
        throw new Error(exception)
    }

}
const fetchOperation = async (data) => {
    try {
        const {
            stellarIp,
            hash
        } = data;
        const server = new stellar.Server(stellarIp);
        let _operationData = await operationByHash(hash, server);
        if (!_operationData) return;
        return _operationData;
    } catch (exception) {
        throw new Error(exception);
    }

}

const transaction = async (data) => {
    try {
        
        const {
            destination,
            amount,
            publicKey,
            secretKey,
            stellarIp,
            fee,
            timeOut
        } = data;
        const server = new stellar.Server(stellarIp);
        let destinationAccount = await findAccount(destination, server);
        if (!destinationAccount) return
        let sourceAccount = await findAccount(publicKey, server);
        let transaction = new stellar.TransactionBuilder(sourceAccount, opts = {
            fee: fee
        })
            .addOperation(stellar.Operation.payment({
                destination: destination,
                asset: stellar.Asset.native(),
                amount: amount,
            })).setTimeout(timeOut)
            .build();
        let sourceKeypairObject = await keypairFromSecret(secretKey, stellar);
        transaction.sign(sourceKeypairObject);
        let transactionData = await server.submitTransaction(transaction);
        return transactionData.hash
    } catch (exception) {
        throw new Error(exception);
    }
}

const tokenTransaction = async (data) => {
    try {
        
        const {
            destinationKey,
            destinationSecretKey,
            amount,
            publicKey,
            secretKey,
            asset,
            stellarIp,
            fee,
            timeOut
        } = data;

        const server = new stellar.Server(stellarIp);
        const assetObject = await new stellar.Asset(asset, publicKey);

        if (!assetObject) return;
        let destinationAccount = await findAccount(destinationKey, server);
        if (!destinationAccount) return
        let balances = destinationAccount.balances;
        let limit = 0;
        if (balances.length == 1) {
            limit = amount;
        } else {
            _.each(balances, function (balance) {
                if (balance.asset_code == asset) {
                    limit = parseInt(balance.balance) + parseInt(amount);
                }
            });
        }
        const trustTransaction = new stellar.TransactionBuilder(destinationAccount, opts = {
            fee: fee
        })
            .addOperation(stellar.Operation.changeTrust({
                asset: assetObject,
                limit: limit.toString()
            })).setTimeout(timeOut)
            .build();

        let destinationKeypairObject = await keypairFromSecret(destinationSecretKey, stellar);
        trustTransaction.sign(destinationKeypairObject);

        let trustData = await server.submitTransaction(trustTransaction);
        if (!trustData) return
        let sourceAccount = await findAccount(publicKey, server);


        const tokenTransaction = new stellar.TransactionBuilder(sourceAccount, opts = {
            fee: fee
        })
            .addOperation(stellar.Operation.payment({
                destination: destinationKey,
                asset: assetObject,
                amount: amount
            })).setTimeout(timeOut)
            .build();
        let sourceKeypairObject = await keypairFromSecret(secretKey, stellar);

        tokenTransaction.sign(sourceKeypairObject);
        let transactionData = await server.submitTransaction(tokenTransaction);
        return transactionData.hash
    } catch (exception) {
        throw new Error(exception);
    }
}

const tokenValue = async (data) => {
    try {
        const {
            asset,
            issuerKey,
            stellarIp
        } = data;
        let res_data = await fetch(`${stellarIp}/order_book?buying_asset_type=credit_alphanum4&buying_asset_code=${asset}&buying_asset_issuer=${issuerKey}&selling_asset_type=native`);
        let data_json = await res_data.json();
        return data_json.bids[0].price
    } catch (exception) {
        throw new Error(exception);
    }

}

//     __  __     __                        ______                 __  _
//    / / / /__  / /___  ___  __________   / ____/_  ______  _____/ /_(_)___  ____  _____
//   / /_/ / _ \/ / __ \/ _ \/ ___/ ___/  / /_  / / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
//  / __  /  __/ / /_/ /  __/ /  (__  )  / __/ / /_/ / / / / /__/ /_/ / /_/ / / / (__  )
// /_/ /_/\___/_/ .___/\___/_/  /____/  /_/    \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
//    
const findAccount = async (address, server) => {
    try {
        let account = await server.loadAccount(address);
        return account;
    } catch (exception) {
        throw new Error(exception)
    }
}

const transactionByHash = async (hash, server) => {
    try {
        let transactionData = await server.transactions().transaction(hash).call();
        return transactionData;
    } catch (exception) {
        throw new Error(exception)
    }

}
const operationByHash = async (hash, server) => {
    try {
        let operationData = await server.operations().forTransaction(hash).call();
        return operationData;
    } catch (exception) {
        throw new Error(exception)
    }


}
const keypair = async (stellar) => {

    try {
        let keypair = stellar.Keypair.random();
        keypair = {
            secret: keypair.secret(),
            key: keypair.publicKey(),
        }
        return keypair;
    } catch (exception) {
        throw new Error(exception)
    }
}
const keypairFromSecret = async (secret, stellar) => {
    try {
        let object = stellar.Keypair.fromSecret(secret);
        return object;
    } catch (exception) {
        throw new Error(exception)
    }
}
module.exports = {
    createStellarAccount,
    getBalance,
    fetchTransaction,
    fetchOperation,
    transaction,
    tokenTransaction,
    tokenValue
}