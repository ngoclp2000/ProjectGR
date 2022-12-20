const BaseModel = require("../baseModel");
const DataTypes = require("../../shared/enums/dataType");

module.exports = class ProductFeedback extends BaseModel {
    constructor(){
        let data = {};
        data.idField = 'productFeedbackId';
        data.table = 'productfeedback';
        super(data);
        this.alias = 'pf';
        this.fields = {
            customerName: {
                type: DataTypes.String
            },
            customerEmail: {
                type: DataTypes.String
            },
            customerPhoneNumber: {
                type: DataTypes.String
            },
            productFeedbackTitle: {
                type: DataTypes.String
            },
            productFeedbackContent: {
                type: DataTypes.String
            },
            productFeedbackStar: {
                type: DataTypes.Number
            },
        }
    }
    static getInstance(){
        if(this.instance == null){
            this.instance = new ProductFeedback();
        }
        return this.instance;
    }
}