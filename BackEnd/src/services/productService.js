const ProductRepo = require('../repos/productRepo');

const productRepo = new ProductRepo();

module.exports = {
    getProductById : async function(productId) {
        return await productRepo.getDataById(productId);
    },
    getDataTable: async function(payload){
        return await productRepo.getDataTable(payload);
    }
}