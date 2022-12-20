const BaseModel = require("../baseModel");
const DataTypes = require("../../shared/enums/dataType");

module.exports = class ProductImage extends BaseModel {
    constructor(){
        let data = {};
        data.idField = 'productImageId';
        data.table = 'productimage';
        super(data);
        this.alias = 'pi';
        this.fields = {
            productImageLink: {
                type: DataTypes.String
            },
        }
    }
    static getInstance(){
        if(this.instance == null){
            this.instance = new ProductImage();
        }
        return this.instance;
    }
}