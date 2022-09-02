import BaseAPI from '@/apis/base/baseapi.js'
import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
class ProductAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig;
        this.controller = 'Product';
    }
}

export default new ProductAPI();