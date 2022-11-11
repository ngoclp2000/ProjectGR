const BaseModel = require("./baseModel");
module.exports = class Product extends BaseModel {
    constructor() {
        let data = {};
        data.table = 'product';
        data.idField = 'productId';
        super(data);
        this.relationField = 'categoryId';
        this.imageTable = 'productimage';
        this.unitTypeTable = 'productunittype';
    }
}