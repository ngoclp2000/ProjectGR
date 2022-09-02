const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;

module.exports = class BaseModel {
    constructor(data) {
        this.table = data.table;
        this.idField = data.idField;
    }

    getDataById = tryCatchBlock(async (id) => {
        // get comment
        const [resultSet] = await database.query(`SELECT * FROM ${this.table} WHERE ${this.idField} = '${id}'`);
        return resultSet.length === 0 ? null : resultSet[0];
    });
    
    getNewId = tryCatchBlock(async () => {
        const [resultSet] = await database.query(`SELECT UUID() as newId;`);
        return resultSet.length === 0 ? null : resultSet[0].newId;
    })
}