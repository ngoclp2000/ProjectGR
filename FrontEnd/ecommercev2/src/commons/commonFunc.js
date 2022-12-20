import store from '@/store/store.js';

class commonFunction{
    async mask(place){
        await store.dispatch({
            type : 'updateIsLoading',
            loading : true
        });

        await store.dispatch({
            type : 'updateLoadingPlace',
            loadingPlace : place
        });
    }

    unmask(){
        store.dispatch({
            type : 'updateIsLoading',
            loading : false
        });

        store.dispatch({ type : 'updateLoadingPlace'});
    }

    cloneDeep(obj){
        return JSON.parse(JSON.stringify(obj))
    }
}

export default new commonFunction();