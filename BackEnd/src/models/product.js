const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const BaseModel = require("./baseModel");

module.exports = class Product extends BaseModel {
    constructor() {
        let data = {};
        data.table = 'product';
        data.idField = 'productId';
        super(data);
        this.relationField = 'categoryId';
        this.imageTable = 'productImage';
        this.unitTypeTable = 'productunittype';
    }
    getDataById = tryCatchBlock(async (id) => {
        // get comment
        const [resultSet] = await database.query(`SELECT * FROM ${this.table} WHERE ${this.idField} = '${id}'; SELECT * FROM ${this.imageTable} WHERE ${this.idField} = '${id}'; 
            SELECT * FROM ${this.unitTypeTable};
        `);
        if (resultSet.length > 0) {
            let res = resultSet[0][0];
            let image = resultSet[1][0];
            let unitType = resultSet[2];
            if (res) {
                let relationId = res[this.relationField];
                // Lấy sản phẩm liên quan
                const [resultRelation] = await database.query(`SELECT * FROM ${this.table} WHERE ${this.relationField} = '${relationId}' AND ${this.idField} <> '${id}' LIMIT 10`);
                
                if (resultRelation && resultRelation.length > 0) {
                    let conditionInClause = '(';
                    for (let i = 0; i < resultRelation.length; i++) {
                        if (i < resultRelation.length - 1) {
                            conditionInClause += `'${resultRelation[i].productId}',`;
                        } else {
                            conditionInClause += `'${resultRelation[i].productId}'`;
                        }
                        if (unitType && Array.isArray(unitType)) {
                            let unitTypeProduct = unitType.find(item => item.productUnitTypeId == resultRelation[i].productUnitTypeId);
                            resultRelation[i].productUnit = unitTypeProduct.productUnitTypeName;
                        }
                    }
                    conditionInClause += ')';
                    // Lấy ảnh của các sản phẩm liên quan
                    const [imageResult] = await database.query(`SELECT * FROM ${this.imageTable} WHERE ${this.idField} IN ${conditionInClause}`);
                    if (imageResult && imageResult.length > 0) {
                        imageResult.forEach(item => {
                            let productId = item.productId;
                            let product = resultRelation.find(item1 => item1.productId == productId);
                            if (product) {
                                product.productImage = item.productImageLink;
                            }
                        })
                    }
                    res.relationProduct = resultRelation;
                }
                if (image) {
                    res.productImage = image.productImageLink;
                }
            }
            return res;
        }
        return null;
    });
}