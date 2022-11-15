const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const HttpError = require("../models/http-errors");
const ProductService = require('../services/productService');

module.exports = {
    getProductById: tryCatchBlock(null, async (req, res, next) => {
        const product = await ProductService.getProductById(req.params.productId);
        return res.status(200).send({
            message: "GET_PRODUCT_SUCCESS",
            data: product
        });
    }),
    getDataTable :tryCatchBlock(null, async (req, res, next) => {
        const product = await ProductService.getDataTable(req.body);
        return res.status(200).send(product);
    })
}