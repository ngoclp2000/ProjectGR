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
            isLoading: false
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
            }
        },
        updateIsLoading(state, payload){
            if(payload){
                state.isLoading = payload.loading;
            }
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