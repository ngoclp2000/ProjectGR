const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const {
    buildUpdateWithParams,
    buildInsertParams,
    buildSelectWithField
} = require("../utils/function");

module.exports = class BaseRepo {
    constructor() {

    }

    getDataById = tryCatchBlock(async (id) => {
        // get comment
        const [resultSet] = await database.query(`SELECT * FROM ${this.model.table} WHERE ${this.model.idField} = '${id}'`);
        return resultSet.length === 0 ? null : resultSet[0];
    });

    getNewId = tryCatchBlock(async () => {
        const [resultSet] = await database.query(`SELECT UUID() as newId;`);
        return resultSet.length === 0 ? null : resultSet[0].newId;
    })

    getAsyncAllData = tryCatchBlock(async () => {
        const sql = `SELECT * FROM ` + this.model.table + ` WHERE 1=1;`;
        const [resultSet] = await database.query(sql);
        return resultSet == null || resultSet.length === 0 ? null : resultSet;
    });

    getAsyncByFields = tryCatchBlock(async (mappingFieldsValues) => {
        if (mappingFieldsValues != null) {
            let sql = buildSelectWithField(mappingFieldsValues, this.model.table);
            if (sql != null && sql != '') {
                const [resultSet] = await database.query(sql);
                return resultSet == null || resultSet.length === 0 ? null : resultSet;
            }
        }
        return null;
    });

    getDataTable = tryCatchBlock(async (payload) => {
        let sql = `SELECT * FROM ${this.model.table};`;
        const [resultSet] = await database.query(sql);
        return resultSet == null || resultSet.length === 0 ? null : resultSet;
    })
}