const BaseModel = require("./baseModel");
const md5 = require("md5");

module.exports = class Account extends BaseModel {
    constructor(param) {
        let data = {};
        data.table = 'user';
        data.idField = 'userId';
        super(data);
        this.controllerName = 'Account';
        if (param && param.password) {
            this.password = param.password ? md5(param.password) : "";
        }
    }
}