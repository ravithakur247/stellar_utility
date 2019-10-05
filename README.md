# what is this?
utility methods for stellar

# initialization 

`npm i stellarUtility --save`

Then...

```
const utility = require('stellarUtility');

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


```
## options 

* *timeout* 180
* *fee* 478
*  *stellarIp* 'https://horizon-testnet.stellar.org' or 'https://horizon.stellar.org'
