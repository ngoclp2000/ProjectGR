const database = require("../utils/database");
const {
    tryCatchBlockForModule,
    buildUpdateWithParams,
    buildInsertParams,
    buildSelectWithField,
    parseSkip,
    parseWhere,
    parseSort
} = require("../utils/function");

module.exports = class BaseRepo {
    constructor() {

    }

    getDataById = tryCatchBlockForModule(async (id) => {
        // get comment
        const [resultSet] = await database.query(`SELECT * FROM ${this.model.table} WHERE ${this.model.idField} = '${id}'`);
        return resultSet.length === 0 ? null : resultSet[0];
    });

    getNewId = tryCatchBlockForModule(async () => {
        const [resultSet] = await database.query(`SELECT UUID() as newId;`);
        return resultSet.length === 0 ? null : resultSet[0].newId;
    })

    getAsyncAllData = tryCatchBlockForModule(async () => {
        const sql = `SELECT * FROM ` + this.model.table + ` WHERE 1=1;`;
        const [resultSet] = await database.query(sql);
        return resultSet == null || resultSet.length === 0 ? null : resultSet;
    });

    getAsyncByFields = tryCatchBlockForModule(async (mappingFieldsValues) => {
        if (mappingFieldsValues != null) {
            let sql = buildSelectWithField(mappingFieldsValues, this.model.table);
            if (sql != null && sql != '') {
                const [resultSet] = await database.query(sql);
                return resultSet == null || resultSet.length === 0 ? null : resultSet;
            }
        }
        return null;
    });

    getDataTable = tryCatchBlockForModule(async (payload) => {
        let sql = `SELECT * FROM ${this.model.table} `;

        let parseWhereValue = parseWhere(payload.filter, this.model);
        let parseSortValue = parseSort(payload.sortBy,payload.sortType);
        sql += " " + parseWhereValue + " " + parseSortValue + " ";

        if (payload) {
            sql += parseSkip(payload.page, payload.size);
        }
        const [resultSet] = await database.query(sql);
        let sqlSummary = `SELECT COUNT(*) as totalRecord FROM ${this.model.table} ${parseWhereValue || ""} ${parseSortValue};`;

        const [resultSummary] = await database.query(sqlSummary);

        let maxPage = 0;
        if (resultSummary) {
            let totalRecord = resultSummary[0].totalRecord;
            maxPage = Math.ceil(totalRecord / parseInt(payload.size || 0));
        }

        return resultSet == null || resultSet.length === 0 ? {
            data : [],
            last_page: 0
        } : {
            data: resultSet,
            last_page: maxPage
        };
    })

    authenAdminRequest = tryCatchBlockForModule(async (userId) =>{
        if(userId){
            let adminRoleName = 'admin';
            let sql = `SELECT * FROM user u  join role r on u.roleId = r.roleId where r.roleName = '${adminRoleName}' and u.userId = '${userId}'`;
            const [resultSet] = await database.query(sql);
            if(resultSet && resultSet[0]){
                return true;
            }
        }
        return false;
    }); 
}