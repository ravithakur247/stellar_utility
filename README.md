# what is this?
utility methods for stellar

# initialization 

`npm i stellarUtility --save`

Then...

```
const utility = require('stellar_utility');

let createAccountData={
            publicKey,
            secretKey,
            startingBalance,
            stellarIp,
            fee,
            timeOut
        } 

const account =utility.createStellarAccount(createAccountData);


let balanceData= {
            publicKey,
            stellarIp
        } 

const balance=utility.getBalance(balanceData);


let fetchTransactionData={
            stellarIp,
            hash
}
const fetchTransaction=utility.fetchTransaction(fetchTransactionData);

let fetchOperationData={
           stellarIp,
            hash
}
const fetchOperation =utility.fetchOperation(fetchOperationData);


let transactionData={
            destination,
            amount,
            publicKey,
            secretKey,
            stellarIp,
            fee,
            timeOut
}
const transaction=utility.transaction(transactionData);

let tokenTransactionDatas={
            destinationKey,
            destinationSecretKey,
            amount,
            publicKey,
            secretKey,
            asset,
            stellarIp,
            fee,
            timeOut
}
const tokenTransaction=utility.tokenTransaction(tokenTransactionDatas)

let tokenValueData={
            asset,
            issuerKey,
            stellarIp
}
const tokenValue=utility.tokenValue(tokenValueData);


also try :

const balanceData = {
    publicKey: 'GDQAPLVN3LMIMRKRNUD2XWZWNXWYQMV3DK2YIPIGJGN3TFQ7KHJBRNOA',
    stellarIp: 'https://horizon-testnet.stellar.org'
}
const getBal = (data) => {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(data)
            resolve(await utility.getBalance(data));

        } catch (e) {
            reject(e)
        }
    });
}

getBal(balanceData).then(async function (value) {
    console.log(value)
})

```
## options 

* *timeout* 180
* *fee* 478
*  *stellarIp* 'https://horizon-testnet.stellar.org' or 'https://horizon.stellar.org'
