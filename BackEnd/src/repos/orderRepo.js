const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const buildInsertParams = require("../utils/function").buildInsertParams;
const BaseRepo = require("./baseRepo");
const OrderModel = require("../models/order.js");

module.exports = class OrderRepo extends BaseRepo {
    constructor() {
        super();
        this.model = new OrderModel();
    }

    createOrder = tryCatchBlock(async (payload,userId) => {
        const newId = await this.getNewId();
        
        const sql = buildInsertParams(this.model.idField,this.model.table,payload,this.model.controllerName,newId);        
        const [resultSet] = await database.query(sql);
        
        return resultSet != null && resultSet.affectedRows > 0;
    })
}