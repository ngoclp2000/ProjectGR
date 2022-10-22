const HttpError = require("../models/http-errors");
const mappingField = require("../helpers/mappingField");


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
    getTokenFromRequest: (req) => {
        return req.headers.authorization.split(" ")[1];
    }
}