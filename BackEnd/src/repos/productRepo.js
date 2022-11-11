const database = require("../utils/database");
const tryCatchBlock = require("../utils/function").tryCatchBlockForModule;
const BaseRepo = require("./baseRepo");
const ProductModel = require("../models/product");

module.exports = class ProductRepo extends BaseRepo {
    constructor() {
        super();
        this.model = new ProductModel();
    }
    /**
     * Lấy dữ liệu theo id
     * tbngoc 06.09.2022
     */
    getDataById = tryCatchBlock(async (id) => {
        // get comment
        const [resultSet] = await database.query(`SELECT * FROM ${this.model.table} WHERE ${this.model.idField} = '${id}'; 
        SELECT * FROM ${this.model.imageTable} WHERE ${this.model.idField} = '${id}'; 
            SELECT * FROM ${this.model.unitTypeTable};
        `);
        if (resultSet.length > 0) {
            let res = resultSet[0][0];
            let image = resultSet[1][0];
            let unitType = resultSet[2];
            if (res) {
                let relationId = res[this.model.relationField];
                // Lấy sản phẩm liên quan
                const [resultRelation] = await database.query(`SELECT * FROM ${this.model.table} WHERE ${this.model.relationField}
                 = '${relationId}' AND ${this.model.idField} <> '${id}' LIMIT 10`);
                
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
                    const [imageResult] = await database.query(`SELECT * FROM ${this.model.imageTable} WHERE ${this.model.idField} IN ${conditionInClause}`);
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