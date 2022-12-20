const BaseModel = require("../baseModel");
const DataTypes = require("../../shared/enums/dataType");
const ProductDetail = require("./productDetail");
const ProductFeedback = require("./productFeedback");
const ProductImage = require("./productImage");
const Account = require("../account");


module.exports = class Product extends BaseModel {
    constructor() {
        let data = {};
        data.table = 'product';
        data.idField = 'productId';
        super(data);
        this.alias = 'p';
        this.relationField = 'categoryId';
        this.imageTable = 'productimage';
        this.unitTypeTable = 'productunittype';
        this.groupCategoryTable = 'groupcategory';
        this.categoryTable = 'category';

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
            categoryId:{
                type: DataTypes.String
            },
            productRate:{
                type: DataTypes.Number
            },
            userId:{
                type: DataTypes.String
            }
        }
        // 0: only Product, 1: Product and Order
        this.relationTable = [{
            model : ProductFeedback.getInstance(),
            foreignKey : 'productId',
            type: 0
        },{
            model : ProductDetail.getInstance(),
            foreignKey : 'productId',
            type: 0
        },{
            model : ProductImage.getInstance(),
            foreignKey : 'productId',
            type: 0
        },{
            model: Account.getInstance(),
            foreignKey: 'userId',
            type: 0
        }]
    }

    static getInstance(){
        if(this.instance == null){
            this.instance = new Product();
        }
        return this.instance;
    }
}