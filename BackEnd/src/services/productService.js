const ProductRepo = require('../repos/productRepo');

const productRepo = new ProductRepo();

module.exports = {
    getProductById : async function(productId) {
        return await productRepo.getDataById(productId);
    }
}