<template>
    <div class="logout-page">
        <div class="logout-container flex flex-row">
            <div class="logout-content-left  w-50">
                <div class="logout-message" v-if="loading">
                    <div class="message">Log out in processing</div><div class="dot-elastic"></div>
                </div>
            </div>
            <div class="logout-content-right  w-50 flex flex-center flex-column">
                <div class="logo-container flex-column flex-center">

                    <a href="#">
                        <div class="logo">

                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, getCurrentInstance,ref } from 'vue';
import authenAPI from '@/apis/components/authenAPI';
export default {
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const loading = ref(true);
        onMounted(async () => {
            let state = proxy.$store.state;
            let res = await authenAPI.removeToken({
                refreshToken: state?.refreshToken,
                userId: state?.account.userId
            });
            if (res && res.data) {
                loading.value = false;
                await proxy.$store.dispatch("deleteAccount");
                await proxy.$store.dispatch("updateToken", {});
                proxy.$router.go();
            }
        });
        return{
            loading
        }
    }
}
</script>

<style lang="scss">
@import './Logout.scss';
</style>