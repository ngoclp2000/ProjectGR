const database = require("../utils/database");
const BaseRepo = require("./baseRepo");
const ProductModel = require("../models/product/product");
const {
    tryCatchBlockForModule,
    parseWhere,
    parseSort,
    parseJoin,
    getSelectClause,
    parseSkip
} = require("../utils/function");
module.exports = class ProductRepo extends BaseRepo {
    constructor() {
        super();
        this.model = ProductModel.getInstance();
    }
    /**
     * Lấy dữ liệu theo id
     * tbngoc 06.09.2022
     */
    getDataById = tryCatchBlockForModule(async (id) => {
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

    getGroupCategoryList = tryCatchBlockForModule(async () => {
        let sql = `SELECT g.groupCategoryId as parentId,g.groupCategoryName as parentName,c.categoryId,c.categoryName FROM ${this.model.groupCategoryTable} g 
        JOIN ${this.model.categoryTable} c ON g.groupCategoryId = c.groupCategoryId
        GROUP BY g.groupCategoryId,g.groupCategoryName,c.categoryId,c.categoryName;`;

        const [resultSet] = await database.query(sql);

        let sqlGroupCategory = `SELECT g.groupCategoryId as categoryId,g.groupCategoryName as categoryName from ${this.model.groupCategoryTable} g;`;
        const [resultGroupCategory] = await database.query(sqlGroupCategory);

        if (resultSet && resultSet.length > 0 && resultGroupCategory && resultGroupCategory.length > 0) {
            return [...resultSet, ...resultGroupCategory]
        }
    });

    getPriceRange = tryCatchBlockForModule(async () => {
        let sql = `SELECT MAX(t.productPrice) as maxPrice,MIN(t.productPrice) as minPrice from ${this.model.table} t where t.productPrice IS NOT NULL;`;
        const [resultSet] = await database.query(sql);
        return resultSet[0];
    });

    getProductList = tryCatchBlockForModule(async (payload) => {
        let sqlJoin = parseJoin(this.model, 0, this.model.alias);
        let sqlSelect = getSelectClause(this.model, ['productImageLink', 'username', 'avatar']);
        let sqlSkip = parseSkip(payload.page, payload.size);
        let sql = `SELECT ${this.model.alias}.*,${sqlSelect} FROM ${this.model.table} ${this.model.alias} ${sqlJoin}`;

        let parseWhereValue = parseWhere(payload.filter, this.model);
        let parseSortValue = parseSort(payload.sortBy, payload.sortType, this.model);


        sql += " " + parseWhereValue + " " + parseSortValue + " " + sqlSkip;
        const [resultSet] = await database.query(sql);
        let maxPage = 0;
        if (payload.page, payload.size) {
            let sqlSummary = `SELECT COUNT(*) as totalRecord FROM ${this.model.table} ${this.model.alias} ${sqlJoin} ${parseWhereValue || ""} ${parseSortValue};`;
            const [resultSummary] = await database.query(sqlSummary);
            if (resultSummary) {
                let totalRecord = resultSummary[0].totalRecord;
                maxPage = Math.ceil(totalRecord / parseInt(payload.size || 0));
            }
        }

        return resultSet == null || resultSet.length === 0 ? {
            data: [],
            last_page : 0
        } : {
            data: resultSet,
            last_page : maxPage
        };
    });
}