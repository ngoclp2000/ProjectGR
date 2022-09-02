const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const buildInsertParams = require("../utils/function").buildInsertParams;
const buildUpdateWithParams = require("../utils/function").buildUpdateWithParams;
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

    signUp = tryCatchBlock(async (payload) => {
        if (payload && payload.password) {
            payload.password = payload.password ? md5(payload.password) : "";
        }
        const newId = await this.getNewId();
        let sql = buildInsertParams(this.idField, this.table, payload, this.controllerName, newId);
        const [resultSet] = await database.query(sql);
        return {
            id: newId,
            code: resultSet.affectedRows > 0 ? 200 : 400
        }
    })

    completeProfile = tryCatchBlock(async (payload) => {
        if (payload) {
            const sql = buildUpdateWithParams(this.idField, this.table, payload, this.controllerName, payload[this.idField]);
            const [resultSet] = await database.query(sql);
            return {
                code: resultSet.affectedRows > 0 ? 200 : 400
            }
        }
    })

    signIn = tryCatchBlock(async (account, password) => {
        this.password = md5(password);
        const sql = `SELECT * FROM ${this.table} WHERE (username = '${account}' or email = '${account}') AND (password = '${this.password}');`;
        const [resultSet] = await database.query(sql);
        return resultSet.length === 0 ?
            null :
            {
                userId: resultSet[0].userId,
                avatar: resultSet[0].avatar,
                fullName: resultSet[0].fullName
            };
    })
}