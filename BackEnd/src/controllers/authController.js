const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const AuthService = require('../services/authService');

module.exports = {
    refreshToken: tryCatchBlock(null, async (req, res, next) => {
        const {
            refreshToken,
            userId
        } = req.body;
        if (!refreshToken) {
            return res.status(403).send({});
        } else {
            let resData = await AuthService.refreshToken({
                refreshToken,
                userId
            });
            return res.status(200).send(resData);
        }
    }),
    removeToken: tryCatchBlock(null, async (req, res, next) => {
        const {
            refreshToken,
            userId
        } = req.body;
        if (!refreshToken) {
            return res.status(403).send({});
        } else {
            let resData = await AuthService.removeToken({
                refreshToken,
                userId
            });
            return res.status(200).send({
                data: resData
            });
        }
    }),
}