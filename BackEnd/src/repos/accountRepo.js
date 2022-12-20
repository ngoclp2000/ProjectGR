const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const buildInsertParams = require("../utils/function").buildInsertParams;
const buildUpdateWithParams = require("../utils/function").buildUpdateWithParams;
const BaseRepo = require("./baseRepo");
const md5 = require("md5");
const AccountModel = require('../models/account');

module.exports = class AccountRepo extends BaseRepo {
    constructor(param) {
        super(param);
        this.model = new AccountModel(param);
    }
    /**
     * Đăng ký tài khoản
     */
    signUp = tryCatchBlock(async (payload) => {
        if (payload && payload.password) {
            payload.password = payload.password ? md5(payload.password) : "";
        }
        const newId = await this.getNewId();
        let sql = buildInsertParams(this.model.idField, this.model.table, payload, this.model.controllerName, newId);
        const [resultSet] = await database.query(sql);
        return {
            id: newId,
            code: resultSet.affectedRows > 0 ? 200 : 400
        }
    })
    /**
     * Hoàn tiện đăng ký
     */
    completeProfile = tryCatchBlock(async (payload) => {
        if (payload) {
            const sql = buildUpdateWithParams(this.model.idField, this.model.table, payload, this.model.controllerName, payload[this.model.idField]);
            const [resultSet] = await database.query(sql);
            return {
                code: resultSet.affectedRows > 0 ? 200 : 400
            }
        }
    })
    /**
     * Đăng nhập
     */
    signIn = tryCatchBlock(async (account, password) => {
        this.model.password = md5(password);
        const sql = `SELECT * FROM ${this.model.table} WHERE (username = '${account}' or email = '${account}') AND (password = '${this.model.password}');`;
        const [resultSet] = await database.query(sql);
        return resultSet.length === 0 ?
            null :
            {
                userId: resultSet[0].userId,
                avatar: resultSet[0].avatar,
                fullName: resultSet[0].fullName,
                email: resultSet[0].email,
            };
    })

    /**
     * Check account exist in the system
     */
    checkAccountExist = tryCatchBlock(async (account) =>{
        
    });
}