const BaseModel = require("./baseModel");
module.exports = class Order extends BaseModel{
    constructor() {
        let data = {};
        data.table = 'order';
        data.idField = 'orderId';
        super(data);
        this.controllerName = 'Order';
    }
}