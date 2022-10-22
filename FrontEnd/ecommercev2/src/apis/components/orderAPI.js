import BaseAPI from '@/apis/base/baseapi.js'
import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
class OrderAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig;
        this.controller = 'Order';
    }

    async takePayment(payload){
        await this.postAsync(`${this.controller}/takePayment`,{},payload);
    }
}

export default new OrderAPI();