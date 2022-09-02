const Product = require('../models/product');

const productInstance = new Product();

module.exports = {
    getProductById : async function(productId) {
        return await productInstance.getDataById(productId);
    }
}