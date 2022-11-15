const BaseModel = require("./baseModel");
const DataTypes = require("../shared/enums/dataType");
module.exports = class Product extends BaseModel {
    constructor() {
        let data = {};
        data.table = 'product';
        data.idField = 'productId';
        super(data);
        this.relationField = 'categoryId';
        this.imageTable = 'productimage';
        this.unitTypeTable = 'productunittype';

        this.fields = {
            productCode: {
                type: DataTypes.String,
            },
            productName: {
                type: DataTypes.String,
            },
            productPrice: {
                type: DataTypes.Number,
            },
            productDiscount: {
                type: DataTypes.Number,
            },
            productDescription: {
                type: DataTypes.String,
            },
            productStatus: {
                type: DataTypes.Boolean,
            },
            productQuantity: {
                type: DataTypes.Number,
            },
        }
    }


}