const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const buildInsertParams = require("../utils/function").buildInsertParams;
const BaseModel = require("./baseModel");


module.exports = class Order extends BaseModel {
    constructor() {
        let data = {};
        data.table = 'order';
        data.idField = 'orderId';
        super(data);
        this.controllerName = 'Order';
    }

    createOrder = tryCatchBlock(async (payload,userId) => {
        const newId = await this.getNewId();
        
        const sql = buildInsertParams(this.idField,this.table,payload,this.controllerName,newId);        
        const [resultSet] = await database.query(sql);
        (await database.getConnection()).beginTransaction((cnn)=>{
            console.log(cnn)
        })
        return resultSet != null && resultSet.affectedRows > 0;
    })
}