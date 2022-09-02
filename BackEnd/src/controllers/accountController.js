const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const HttpError = require("../models/http-errors");
const AccountService = require('../services/accountService');
const Authentication = require('../models/authentication');
module.exports = {
    signUp: tryCatchBlock(null, async (req, res, next) => {
        const result = await AccountService.signUp(req.body);
        return res.status(200).send({
            message: "GET_PRODUCT_SUCCESS",
            data: result
        });
    }),
    completeProfile : tryCatchBlock(null, async (req, res, next) =>{
        const result = await AccountService.completeProfile(req.body);
        return res.status(200).send({
            message : "COMPLETE_PROFILE_SUCCESS",
            data : result
        })
    }),
    signIn: tryCatchBlock(null, async (req, res, next) => {
        const { account, password } = req.body;
        const result = await AccountService.signIn(account, password);
        if (!result) return res.status(404).send({ message: "SIGN_IN_FAIL" });

        return res.status(200).send({ message: "SIGN_IN_SUCCESS", data: Authentication.createToken(result) });
    })
}