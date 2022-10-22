import BaseAPIConfig from '@/apis/base/baseapiconfig.js'
import store from '@/store/store.js';
export default class BaseApi{
    constructor(){
        this.controller = null
    }
    /**
     * Phương thức lấy tất cả dữ liệu
     * Created By TBN (14/08/2022)
     */
    getAllData(){
        return BaseAPIConfig.get(`${this.controller}`)
    }
    /**
     * Phương thức cập nhật dữ liệu lên database
     * Created By TBN (14/08/2022)
     * @param {Guid} id id của đối tượng
     * @param {Object} body object truyền lên
     */
    updateData(id,body){
        return BaseAPIConfig.put(`${this.controller}${id}`,body)
    }
    /**
     * Phương thức xóa dữ liệu
     * Created By TBN (14/08/2022)
     * @param {Guid} id  id của đối tượng
     * @returns 
     */
    deleteData(id){
        return BaseAPIConfig.delete(`${this.controller}${id}`)
    }
    /**
     * Phương thức lấy dữ liệu theo mã định danh
     * Created By TBN (14/08/2022)
     * @param {Guid} id id của đối tượng
     */
    getDataById(id){
        return BaseAPIConfig.get(`${this.controller}/${id}`);
    }
    /**
     * Phương thức xóa nhiều dữ liệu
     * Created By TBN (14/08/2022)
     * @param {Object} payload object truyền vào request
     */
    deleteMultipleData(payload){
        return BaseAPIConfig.post(`${this.controller}Delete_List`,payload)
    }
    /**
     * Phương thức thêm mới dữ liệu
     * Created By TBN (14/08/2022)
     * @param {Object} payload 
     */
    createNewData(payload) {
        return BaseAPIConfig.post(`${this.controller}`,payload);
    }
    /**
     * Phương thức lấy dữ liệu theo mã code
     * Created By TBN (14/08/2022)
     * @param {String} code mã code của đối tượng
     */
    getDataByCode(code){
        return BaseAPIConfig.get(`${this.controller}code/${code}`)
    }

    getAsync(url,headers){
        return BaseAPIConfig.get(url,{
            headers
        });
    }
    
    async postAsync(url,headers,data){
        console.log(headers)
        if(headers == null || Object.keys(headers).length === 0){
            headers ={"Authorization" : `Bearer ${store.state.token}`};
        }

        return await BaseAPIConfig.post(url,data,{
            headers
        });
    }
}