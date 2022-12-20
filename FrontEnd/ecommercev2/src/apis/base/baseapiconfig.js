import APIConfig from '@/apis/config/apiconfig.js';
import axios from "axios";
import store from '@/store/store.js';
import router from '@/routers';

const BaseApiConfig = axios.create({
    baseURL: APIConfig,
    headers: {
        'Content-Type': 'application/json'
    }
})

BaseApiConfig.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.token}`;
    return config;
});

BaseApiConfig.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error && [401, 403].includes(error.response?.status)) {
        let refreshToken = store.state.refreshToken;
        let userId = store.state.account.userId;
        if (!refreshToken) {
            await store.dispatch("deleteAccount");
            await store.dispatch("updateToken", {});
        } else {
                try {
                    let newToken = await BaseApiConfig.post('Auth/refresh-token', {
                        refreshToken,
                        userId
                    });
                    if (newToken && newToken.data) {
                        await store.dispatch("updateToken", {
                            token: newToken.data.token,
                            refreshToken: refreshToken
                        });
                        error.config.headers.Authorization = `Bearer ${newToken.data.token}`
                        return axios(error.config);
                    } else {
                        await store.dispatch("deleteAccount");
                        await store.dispatch("updateToken", {});
                        router.go();
                        return axios(error.config);
                    }
                } catch (error) {
                    return Promise.reject(error);
                }
        }
    } else {
        return Promise.reject(error);
    }
});

export default BaseApiConfig;