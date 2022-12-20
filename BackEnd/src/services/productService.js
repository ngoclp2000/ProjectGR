const ProductRepo = require('../repos/productRepo');
const ErrorCode = require('../shared/enums/errorCode');
const productRepo = new ProductRepo();
const FilterType = require('../shared/enums/filterType');


module.exports = {
    /**
     * Lấy sản phẩm theo productID
     * @param {*} productId 
     * @returns Sản phẩm
     * tbngoc 17.12.2022
     */
    getProductById: async function (productId) {
        return await productRepo.getDataById(productId);
    },
    /**
     * Lấy danh sách dữ liệu bảng
     * @param {*} payload 
     * @returns 
     * tbngoc 17.12.2022
     */
    getDataTable: async function (payload) {
        return await productRepo.getDataTable(payload);
    },
    /**
     * Lấy danh sách filter sản phẩm
     * @param {*} userId 
     * @returns 
     * tbngoc 17.12.2022
     */
    getProductManage: async function (userId) {
        // Kiểm tra user có phải là admin hay không
        let result = await productRepo.authenAdminRequest(userId);
        if (!result) {
            return {
                code: ErrorCode.NotAdmin,
                data: null
            };
        } else {
            // Khi là admin
            let resData = [];
            // Phân loại
            let groupCategoryList = await productRepo.getGroupCategoryList();
            if (groupCategoryList != null) {
                resData.push({
                    data: groupCategoryList,
                    type: FilterType.Tree,
                    id: 'categoryId',
                    parentId: 'parentId',
                    nameField: 'categoryName',
                    name: 'Category',
                    field: 'categoryId'
                });
            }


            // Khoảng giá
            let priceRangeFilter = await productRepo.getPriceRange();
            if (priceRangeFilter != null) {
                resData.push({
                    data: {
                        min : priceRangeFilter.minPrice,
                        max: priceRangeFilter.maxPrice
                    },
                    type: FilterType.Range,
                    name: 'Range Price',
                    field: 'productPrice'
                });
            }

            // rating(mặc định)
            resData.push({
                type: FilterType.Rate,
                name: 'Star Rating',
                field: 'productRate'
            });
            
            return {
                code: ErrorCode.None,
                data: resData
            }
        }
    },
    /**
     * Lấy danh sách sản phẩm
     * @param {*} payload 
     * @returns 
     * tbngoc 17.12.2022
     */
    getProductList: async function(payload){
        try{
            // Add filter user 
            if(payload.filter && Array.isArray(payload.filter)){
                payload.filter.push({
                    "type" : "=",
                    "field" : "userId",
                    "value" : payload.userID
                });
            }
            
            let productListData =  await productRepo.getProductList(payload);
            if(productListData && productListData.data && Array.isArray(productListData.data)){
                productListData.data.forEach(item => {
                    item.productRate = parseFloat(item.productRate || '0');
                });
            }
            return productListData;
        }catch(err){
            throw err;
        }
    }
}