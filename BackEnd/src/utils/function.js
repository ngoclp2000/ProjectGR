const HttpError = require("../models/http-errors");
const mappingField = require("../helpers/mappingField");
const optionFilter = require("../shared/enums/optionFilter");
const DataTypes = require("../shared/enums/dataType");

module.exports = {
    tryCatchBlockForModule: (passInFunc) => {
        return async (...args) => {
            try {
                return await passInFunc(...args);
            } catch (error) {
                console.log("Error in tryCatchBlockForModule:::", error);
                throw error;
            }
        };
    },
    tryCatchBlockForController: (schema, passInFunc) => {
        return async (req, res, next) => {
            if (schema) {
                //const validateRequest = ajv.compile(schema);
                //const validRequest = validateRequest(req.body);
                //if (!validRequest) return next(new HttpError("REQUEST_FAIL_INVALID_SCHEMA", 400));
            }
            try {
                return await passInFunc(req, res, next);
            } catch (error) {
                console.log("Error in tryCatchBlockForController:::", error);
                return next(new HttpError("SERVER_INTERNAL_ERROR", 500));
            }
        };
    },
    buildInsertParams: function (idField, table, payload, controllerName, newIdValue) {
        table = '`' + table + '`';
        let sql = `INSERT INTO ${table}{0} VALUES{1};`;
        let sqlValuesArray = [newIdValue],
            sqlFieldsArray = [idField];
        if (payload && typeof payload == 'object') {
            for (const [key, value] of Object.entries(payload)) {
                let keyMap = key;
                if (mappingField[controllerName] && mappingField[controllerName][key]) {
                    keyMap = mappingField[controllerName][key];
                }
                sqlFieldsArray.push(keyMap);
                sqlValuesArray.push(value);
            }
            // Xử lý nhóm dữ liệu
            let sqlFields = sqlFieldsArray.join(',');
            let sqlValues = "";
            for (let i = 0; i < sqlValuesArray.length; i++) {
                if (typeof sqlValuesArray[i] === 'string') {
                    sqlValues += "'" + sqlValuesArray[i] + "'";
                } else {
                    sqlValues += sqlValuesArray[i];
                }

                if (i != sqlValuesArray.length - 1) {
                    sqlValues += ',';
                }
            }
            sqlFields = '(' + sqlFields + ')';
            sqlValues = '(' + sqlValues + ')';
            sql = sql.format(sqlFields, sqlValues);
            return sql;
        }
    },
    buildUpdateWithParams: function (idField, table, payload, controllerName, IdValue) {
        let sql = `UPDATE ${table} SET {0} WHERE ${idField} = ${typeof IdValue === 'string' ? "'" + IdValue + "'" : IdValue};`;
        let sqlValuesArray = [],
            sqlFieldsArray = [];
        if (payload && typeof payload == 'object') {
            for (const [key, value] of Object.entries(payload)) {
                if (key != idField) {
                    sqlFieldsArray.push(mappingField[controllerName][key] || key);
                    sqlValuesArray.push(value);
                }
            }
            // Xử lý nhóm dữ liệu
            let sqlSetParam = '';
            for (let i = 0; i < sqlValuesArray.length; i++) {
                if (typeof sqlValuesArray[i] === 'string') {
                    sqlSetParam += sqlFieldsArray[i] + "='" + sqlValuesArray[i] + "'";
                } else {
                    sqlSetParam += sqlFieldsArray[i] + "=" + sqlValuesArray[i];
                }

                if (i != sqlValuesArray.length - 1) {
                    sqlSetParam += ',';
                }
            }

            sql = sql.format(sqlSetParam);
            return sql;
        }
    },
    buildSelectWithField: function (mappingFieldsValues, table) {
        let sql = "",
            where = "";
        if (mappingFieldsValues != null) {
            let whereArray = [];
            for (const [key, value] of Object.entries(mappingFieldsValues)) {
                whereArray.push(`${"`" +key + "`"} = ${typeof value === 'string' ? "'" + value + "'" : value}`);
            }
            if (whereArray.length > 0) {
                where = whereArray.join('AND');
                sql += `SELECT * FROM ${table} WHERE ${where};`;
            }
        }
        return sql;
    },
    getTokenFromRequest: (req) => {
        return req.headers.authorization.split(" ")[1];
    },
    parseWhere(filters, fieldsConfig) {
        let sql = "",
            arrayWhere = [];
        if (filters && Array.isArray(filters) && filters.length > 0) {
            filters.forEach(item => {
                let keyword = "";
                switch (item.type) {
                    case optionFilter.Like:
                        keyword = "LIKE";
                        break;
                    case optionFilter.Equal:
                        keyword = "=";
                        break;
                    case optionFilter.NotEqual:
                        keyword = "!=";
                        break;
                    case optionFilter.GreaterThan:
                        keyword = ">";
                        break;
                    case optionFilter.LessThan:
                        keyword = "<";
                        break;
                    case optionFilter.GreaterThanOrEqual:
                        keyword = ">=";
                        break;
                    case optionFilter.LessThanOrEqual:
                        keyword = "<=";
                        break;
                    case optionFilter.In:
                        keyword = "IN";
                        break;
                }
                // Lấy dạng của giá trị
                let value = "";
                if (fieldsConfig != null) {
                    let fieldType = fieldsConfig[item.field].type;
                    switch (fieldType) {
                        case DataTypes.Number:
                        case DataTypes.Boolean:
                            value = item.value;
                            break;
                        case DataTypes.String:
                            switch (item.type) {
                                case optionFilter.Like:
                                    value = "'%" + item.value + "%'";
                                    break;
                                default:
                                    value = "'" + item.value + "'";
                                    break;
                            }
                            break;
                        case DataTypes.Date:
                            break;
                    }
                }
                arrayWhere.push(`(${item.field} ${keyword} ${value})`);
            });
        }
        
        sql = arrayWhere.join(" AND ");
        if (sql != null && sql != "") {
            sql = " WHERE " + sql;
        }
        return sql;
    },
    parseSkip(page, size) {
        if (page && size) {
            const pageInt = parseInt(page),
                sizeInt = parseInt(size);
            return `LIMIT ${size} OFFSET ${(pageInt - 1) * sizeInt}`;
        }
    },

}