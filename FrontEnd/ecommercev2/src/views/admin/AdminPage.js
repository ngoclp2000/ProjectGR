import {reactive} from 'vue';
import store from '@/store/store.js';

export const useAdminPage = () =>{
    const menuList = reactive(store.state.menuList);
    return{
        menuList
    }
}