import BaseAPI from '@/apis/base/baseapi.js'
import BaseAPIConfig from '@/apis/base/baseapiconfig.js'

class AuthenAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig;
        this.controller = 'Auth';
    }

    refreshToken(payload){
        return this.BaseAPIConfig.post(`${this.controller}/refresh-token`,payload);
    }

    removeToken(payload){
        return this.BaseAPIConfig.post(`${this.controller}/remove-token`,payload);
    }
}

export default new AuthenAPI();