import BaseAPI from '@/apis/base/baseapi.js'
import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
import store from '@/store/store.js';
class ProductAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig;
        this.controller = 'Product';
    }

    async getProductManage(headers){
        return await this.getAsync(`${this.controller}/productManage`,headers);
    }

    async getProductList(payload) {
        return await this.postAsync(`${this.controller}/dataProductList`,payload);
    }
}

export default new ProductAPI();