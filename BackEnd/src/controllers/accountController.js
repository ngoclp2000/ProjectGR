const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const HttpError = require("../models/http-errors");
const AccountService = require('../services/accountService');
const Authentication = require('../models/authentication');
const ErrorCode = require('../shared/enums/errorCode');
const signUpMessage = require('../shared/resources/signUpMessage');

module.exports = {
    signUp: tryCatchBlock(null, async (req, res, next) => {
        const result = await AccountService.signUp(req.body);
        if(result.isError){
            switch(result.errorCode){
                case ErrorCode.DuplicateUserName:
                    result.errorMessage = signUpMessage.DuplicateUserName;
                    return res.status(200).send(result); 
            }
        }

        return res.status(200).send({
            message: "GET_PRODUCT_SUCCESS",
            data: result?.data
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
        let dataResponse = await Authentication.createToken(result);
        return res.status(200).send({ message: "SIGN_IN_SUCCESS", data: dataResponse });
    })
}