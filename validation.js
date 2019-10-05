const Joi = require('joi');

const createAccountValidator = async (data) => {
    const schema = {
        startingBalance: Joi.string().required(),
        publicKey: Joi.string().required(),
        secretKey: Joi.string().required(),
        stellarIp: Joi.string().required(),
        fee: Joi.required(),
        timeOut: Joi.required()

    };
    return Joi.validate(data, schema);
}
const getBalanceValidator = async (data) => {
    const schema = {
        publicKey: Joi.string().required(),
        stellarIp: Joi.string().required(),
    };
    return Joi.validate(data, schema);
}

const fetchTransactionValidator = async (data) => {
    const schema = {
        stellarIp: Joi.string().required(),
        hash: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

const transactionValidator = async (data) => {
    const schema = {
        destination: Joi.string().required(),
        amount: Joi.string().required(),
        publicKey: Joi.string().required(),
        secretKey: Joi.string().required(),
        stellarIp: Joi.string().required(),
        fee: Joi.required(),
        timeOut: Joi.required()
    }
    return Joi.validate(data, schema);
}
const tokenTransactionValidator = async (data) => {
    const schema = {
        destinationKey: Joi.string().required(),
        destinationSecretKey: Joi.string().required(),
        amount: Joi.string().required(),
        publicKey: Joi.string().required(),
        secretKey: Joi.string().required(),
        asset: Joi.string().required(),
        stellarIp: Joi.string().required(),
        fee: Joi.required(),
        timeOut: Joi.required()
    }
    return Joi.validate(data, schema);
}
const validateTokenValue = async (data) => {
    const schema = {
        asset: Joi.string().required(),
        issuerKey: Joi.string().required(),
        stellarIp: Joi.string().required(),
    }
    return Joi.validate(data, schema);
}
module.exports = {

    createAccountValidator,
    transactionValidator,
    tokenTransactionValidator,
    validateTokenValue,
    getBalanceValidator,
    fetchTransactionValidator
}