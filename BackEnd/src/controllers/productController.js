const tryCatchBlock = require("../utils/function").tryCatchBlockForController;
const HttpError = require("../models/http-errors");
const Product = require("../models/product/product");
const ProductService = require('../services/productService');
const ErrorCode = require('../shared/enums/errorCode');

module.exports = {
    getProductById: tryCatchBlock(null, async (req, res, next) => {
        const product = await ProductService.getProductById(req.params.productId);
        return res.status(200).send({
            message: "GET_PRODUCT_SUCCESS",
            data: product
        });
    }),
    getDataTable :tryCatchBlock(null, async (req, res, next) => {
        try{
            const product = await ProductService.getDataTable(req.body);
            return res.status(200).send(product);
        }catch (error){
            return res.status(403);
        }
    }),
    getProductManage: tryCatchBlock(null, async (req, res, next) => {
        const result = await ProductService.getProductManage(req.userData?.userID);
        if(result){
            switch(result.code){
                case ErrorCode.NotAdmin:
                    return res.status(203).send({
                        message: 'You are not admin'
                    });
                default:
                    return res.status(200).send(result.data);
            }
        }
    }),
    getProductList: tryCatchBlock(null, async (req,res,next) =>{
        try{
            req.body = {...req.body,...req.userData};
            const product = await ProductService.getProductList(req.body);
            return res.status(200).send(product);
        }catch (error){
            return res.status(403);
        }
    })
}