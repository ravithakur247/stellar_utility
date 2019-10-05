const stellarService = require('./service');
const Validators = require('./validation');
const message = require('./constant')


const createStellarAccount = async (data) => {
    try {

        await Validators.createAccountValidator(data);
        const _result = await stellarService.createStellarAccount(data);
        if (!_result) return message.FAILURE;

        return {
            messgae: message.SUCCESS,
            data: _result
        }

    } catch (Exception) {
        return Exception.toString();
    }
}

const getBalance = async (data) => {
    try {
        await Validators.getBalanceValidator(data);
        let balanceData = await stellarService.getBalance(data);
        if (!balanceData) return message.FAILURE;

        return {
            "balance": balanceData
        }
    } catch (Exception) {
        return Exception.toString();
    }
}
const fetchTransaction = async (data) => {
    try {
        await Validators.fetchTransactionValidator(data);
        let transactionData = await stellarService.fetchTransaction(data);
        if (!transactionData) return message.FAILURE;

        return {
            "transaction": transactionData
        };
    } catch (Exception) {
        return Exception.toString();
    }
}
const fetchOperation = async (data) => {
    try {
        await Validators.fetchTransactionValidator(data);
        let operationData = await stellarService.fetchOperation(data);
        if (!operationData) return message.FAILURE;
        return {
            "operation": operationData
        };
    } catch (Exception) {
        return Exception.toString();
    }
}
const transaction = async (data) => {
    try {

        await Validators.transactionValidator(data);
        const _result = await stellarService.transaction(data);
        if (!_result) return message.FAILURE;
        return {
            messgae: message.SUCCESS,
            data: _result
        };

    } catch (Exception) {
        return Exception.toString();
    }
}
const tokenTransaction = async (data) => {
    try {

        await Validators.tokenTransactionValidator(data);
        const _result = await stellarService.tokenTransaction(data);
        if (!_result) return message.FAILURE;
        return {
            messgae: message.SUCCESS,
            data: _result
        };

    } catch (Exception) {
        return Exception.toString();
    }
}
const tokenValue = async (data) => {
    try {
        await Validators.validateTokenValue(data);
        let _result = await stellarService.tokenValue(data);
        if (!_result) return message.FAILURE;
        return {
            messgae: message.SUCCESS,
            data: _result
        };


    } catch (Exception) {
        return Exception.toString();

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