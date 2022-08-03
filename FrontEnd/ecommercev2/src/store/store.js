import {
    createStore
} from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            productView:{

            }
        }
    },
    mutations: {
        changeProductView(state,payload) {
            state.productView = payload.productView;
        }
    },
    actions:{
        changeProductView(context,payload) {
            context.commit("changeProductView",payload);
        }
    }
})

export default store;