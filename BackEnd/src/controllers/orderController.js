const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const HttpError = require("../models/http-errors");
const OrderService = require('../services/orderService');

module.exports = {
    takePayment: tryCatchBlock(null, async (req, res, next) => {
        // const product = await ProductService.getProductById(req.params.productId);
        // return res.status(200).send({
        //     message: "GET_PRODUCT_SUCCESS",
        //     data: product
        // });
        const result = await OrderService.takePayment(req.body,req.userData?.userID);
        return res.status(200).send({});
    })
}