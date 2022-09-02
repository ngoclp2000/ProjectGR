import BaseAPI from '@/apis/base/baseapi.js'
import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
class AccountAPI extends BaseAPI {
    constructor(){
        super();
        this.BaseAPIConfig = BaseAPIConfig;
        this.controller = 'Account';
    }

    signup(payload){
        return this.BaseAPIConfig.post(`${this.controller}/signUp`,payload);
    }

    completeProfile(payload){
        return this.BaseAPIConfig.post(`${this.controller}/completeProfile`,payload);
    }

    signIn(payload){
        return this.BaseAPIConfig.post(`${this.controller}/signIn`,payload);
    }
}

export default new AccountAPI();