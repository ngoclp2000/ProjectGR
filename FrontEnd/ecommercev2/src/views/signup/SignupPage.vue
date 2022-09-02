<template>
    <div class="signup-page">
        <div class="signup-container flex flex-row">
            <div class="signup-content-left  w-50">
                <div class="signup-content-left-title">
                    Đăng ký
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Tài khoản
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Nhập email hoặc số điện thoại" :modelValue="model.account"
                            @update:modelValue="updateValue" field="account"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Mật khẩu
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Mật khẩu" :modelValue="model.password" @update:modelValue="updateValue"
                            type="password" field="password"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Nhập lại mật khẩu
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Nhập lại mật khẩu" :modelValue="model.confirmPassword"
                            @update:modelValue="updateValue" field="confirmPassword" type="password"></base-input>
                    </div>
                </div>
                <div class="signup-field-container flex flex-column">
                    <div class="signup-field-label">
                        Họ và tên
                    </div>
                    <div class="signup-field-input">
                        <base-input placeholder="Họ và tên" :modelValue="model.name" @update:modelValue="updateValue"
                            field="name"></base-input>
                    </div>
                </div>
                <div class="signup-button">
                    <base-button text="ĐĂNG KÝ" customClass="btn-white btn-padding w-100" @click="goToCompleteProfile">
                    </base-button>
                </div>
            </div>
            <div class="signup-content-right  w-50 flex flex-center flex-column">
                <div class="logo-container flex-column flex-center">

                    <a href="/">
                        <div class="logo">

                        </div>
                    </a>
                    <div class="welcome-text">
                        Chào mừng bạn đến mới Tân Thời Shop
                    </div>
                </div>
                <div class="ask">
                    Bạn đã có tài khoản?
                </div>
                <div class="signup-button">
                    <base-button text="ĐĂNG NHẬP" customClass="btn-red btn-padding" @click="goToLogin">
                    </base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@/components/button/BaseButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import AccountAPI from '@/apis/components/accountAPI';
import { ref, getCurrentInstance } from 'vue';
export default {
    name: 'SignupPage',
    components: {
        BaseButton,
        BaseInput
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const model = ref({});
        const updateValue = (value, field) => {
            model.value[field] = value;
        }
        const goToLogin = () => {
            proxy.$router.push("/login");
        }
        const goToCompleteProfile = async () => {
            // Lưu tài khoản đã đăng ký
            delete proxy.model.confirmPassword;
            let res = await AccountAPI.signup(proxy.model);
            if (res && res.data && res.data.data && res.data.data.code == 200) {
                let resData = res.data.data;
                proxy.model.userId = resData.id;
                proxy.$store.dispatch("updateAccount", proxy.model);
                proxy.$router.push("/completeProfile");
            }
        }

        return {
            model,
            updateValue,
            goToLogin,
            goToCompleteProfile
        }
    }
}
</script>

<style lang="scss">
@import './SignupPage.scss';
</style>