import {
    createStore
} from 'vuex'
import createPersistedState from "vuex-persistedstate";
// Create a new store instance.
const store = createStore({
    state() {
        return {
            productView: {

            },
            productCartList: [

            ],
            snackBar:{
                isDisplay: false,
                message : '',
                timeOut: 2500
            },
            isLoading: false,
            menuList:[{
                iconClass: 'icon24-admin dashboard',
                content: 'Dashboard',
                route: '/admin/dashboard',
                key: 'dashboard',
                isSelected: true
            },{
                iconClass: 'icon24-admin product',
                content: 'Product',
                route: '/admin/product',
                key: 'product',
                isSelected: false
            },{
                iconClass: 'icon24-admin category',
                content: 'Category',
                route: '/admin/category',
                key: 'category',
                isSelected: false
            },{
                iconClass: 'icon24-admin order',
                content: 'Order',
                route: '/admin/order',
                key: 'order',
                isSelected: false
            },{
                iconClass: 'icon24-admin sales',
                content: 'Sales Promotion',
                route: '/admin/sales',
                key: 'sales',
                isSelected: false
            },{
                iconClass: 'icon24-admin customer',
                content: 'Customer',
                route: '/admin/customer',
                key: 'customer',
                isSelected: false
            },{
                iconClass: 'icon24-admin supplier',
                content: 'Supplier',
                route: '/admin/supplier',
                key: 'supplier',
                isSelected: false
            },{
                iconClass: 'icon24-admin accounting',
                content: 'Accounting',
                route: '/admin/accounting',
                key: 'accounting',
                isSelected: false
            }]
        }
    },
    mutations: {
        changeProductView(state, payload) {
            state.productView = payload.productView;
        },
        addProductCart(state, payload) {
            if (payload) {
                let index = state.productCartList.findIndex(x => x.productId == payload.productId);
                if (index < 0) {
                    state.productCartList.push(payload);
                } else {
                    state.productCartList[index].productQuantity += payload.productQuantity;
                }
            }
        },
        emptyProductCart(state, payload) {
            state.productCartList = [];
        },
        removeProductCart(state, payload) {
            if (payload) {
                state.productCartList = state.productCartList.filter(item => item.productId != payload.productId);
            }
        },
        updateAccount(state, payload) {
            if (payload != null && typeof payload == 'object') {
                if(state.account == null) {
                    state.account = {};
                }
                for (const [key, value] of Object.entries(payload)) {
                    state.account[key] = value;
                }
            }
        },
        updateToken(state, payload) {
            if(payload && typeof payload === 'object') {
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
            }
        },
        updateIsLoading(state, payload){
            if(payload){
                state.isLoading = payload.loading;
            }
        },
        deleteAccount(state, payload){
            state.account = {};
        },
        updateMenuItems(state, payload){
            if(payload){
                state.menuList = payload;
            }
        },
        changeStackRequestCount(state, payload){
            state.stackRequestCount += payload;
        },
        changeNewToken(state, payload){
            state.newToken = payload;
        },
        updateLoadingPlace(state,payload){
            if(payload){
                state.loadingPlace = payload.loadingPlace;
            }
        },
        changeSnackBar(state,payload){
            state.snackBar = payload;
        }
    },
    actions: {
        changeProductView(context, payload) {
            context.commit("changeProductView", payload);
        },
        addProductCart(context, payload) {
            context.commit("addProductCart", payload);
        },
        emptyProductCart(context, payload) {
            context.commit("emptyProductCart", payload);
        },
        removeProductCart(context, payload) {
            context.commit("removeProductCart", payload);
        },
        updateAccount(context, payload) {
            context.commit("updateAccount", payload);
        },
        updateToken(context, payload) {
            context.commit("updateToken",payload);
        },
        updateIsLoading(context, payload){
            context.commit("updateIsLoading",payload);
        },
        deleteAccount(context,payload) {
            context.commit("deleteAccount",payload);
        },
        updateMenuItems(context,payload){
            context.commit("updateMenuItems",payload);
        },
        changeStackRequestCount(context,payload){
            context.commit("changeStackRequestCount",payload);
        },
        changeNewToken(context,payload){
            context.commit("changeNewToken",payload);
        },
        updateLoadingPlace(context,payload){
            context.commit("updateLoadingPlace",payload);
        },
        changeSnackBar(context,payload){
            context.commit("changeSnackBar",payload);
        }
    },
    getters: {
        totalMoneyCart(state) {
            let totalMoney = 0;
            if (state.productCartList) {
                state.productCartList.forEach(item => totalMoney += item.productQuantity * item.productPrice);
            }
            return totalMoney;
        }
    },
    plugins: [createPersistedState()]
})

export default store;