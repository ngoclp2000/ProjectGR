import {ref,getCurrentInstance} from 'vue';

export const useTheMenuData = () => {
    const {proxy} = getCurrentInstance();

    const menuItems = ref([{
        text : 'Sản phẩm khuyến mãi',
        path: '/san-pham-khuyen-mai'
    },{
        text : 'Rau, củ, trái cây',
        path: '/rau-cu-trai-cay'
    },{
        text : 'Thịt, trứng, hải sản',
        path: '/thit-trung-hai-san'
    },{
        text : 'Thực phẩm chế biến',
        path: '/thuc-pham-che-bien'
    },{
        text : 'Thực phẩm đông lạnh',
        path: '/thuc-pham-dong-lanh'
    },{
        text : 'Thực phẩm khô, gia vị',
        path: '/thuc-pham-kho-gia-vi'
    },{
        text : 'Bánh kẹo, đồ ăn vặt',
        path: '/banh-keo-do-an-vat'
    },{
        text : 'Sữa và các sản phẩm từ sữa',
        path: '/sua-va-cac-san-pham-tu-sua'
    },{
        text : 'Đồ uống, giải khát',
        path: '/do-uong-giai-khat'
    },{
        text : 'Hóa mỹ phẩm',
        path: '/hoa-my-pham'
    },{
        text : 'Chăm sóc cá nhân',
        path: '/cham-soc-ca-nhan'
    },{
        text : 'Chăm sóc mẹ và bé',
        path: '/cham-soc-me-va-be'
    }]);
}