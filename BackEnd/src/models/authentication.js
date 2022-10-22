const jwt = require("jsonwebtoken");
module.exports = {
    createToken: (payload) => {
        let token = jwt.sign(payload, process.env.TOKEN_SECURITY_KEY, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });
        return token;
    }
}