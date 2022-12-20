import {reactive} from 'vue';
import { getCurrentInstance, onMounted,ref } from 'vue';

export const useAdminPage = () =>{
    const { proxy } = getCurrentInstance();

    const menuList = reactive(proxy.$store.state.menuList);

    const changeChosenTabMenuItem = async (key) =>{
        menuList.forEach(item => {
            if (item.key == key) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
        await proxy.$store.dispatch('updateMenuItems', menuList);
    }

    return{
        menuList,
        changeChosenTabMenuItem
    }
}