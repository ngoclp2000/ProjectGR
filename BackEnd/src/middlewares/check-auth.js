const HttpError = require("../models/http-errors");
const jwt = require("jsonwebtoken");
const { getTokenFromRequest } = require("../utils/function");


module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = getTokenFromRequest(req);
    if (!token) throw new Error();
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECURITY_KEY);
    //const userIDIsExist = await User.isUserIDExist(decodedToken.userID);
    //if (!userIDIsExist) return next(new HttpError("AUTHORIZATION_FAIL_USERID_NOT_EXIST", 404));

    req.userData = { userID: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
};
