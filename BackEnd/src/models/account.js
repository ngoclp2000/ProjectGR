const BaseModel = require("./baseModel");
const md5 = require("md5");
const DataTypes = require("../shared/enums/dataType");

module.exports = class Account extends BaseModel {
    constructor(param) {
        let data = {};
        data.table = 'user';
        data.idField = 'userId';
        super(data);
        this.controllerName = 'Account';
        this.alias = 'u';
        if (param && param.password) {
            this.password = param.password ? md5(param.password) : "";
        }

        this.fields = {
            userId: {
                type: DataTypes.String,
            },
            username: {
                type: DataTypes.String,
            },
            phoneNumber: {
                type: DataTypes.String,
            },
            address: {
                type: DataTypes.String,
            },
            email: {
                type: DataTypes.String,
            },
            status: {
                type: DataTypes.Boolean,
            },
            password: {
                type: DataTypes.String,
            },
            fullName: {
                type: DataTypes.String,
            },
            avatar: {
                type: DataTypes.String,
            },
            roleId:{
                type: DataTypes.String,
            }
        }
        
        
    }
    static getInstance(){
        if(this.instance == null){
            this.instance = new Account();
        }
        return this.instance;
    }
}