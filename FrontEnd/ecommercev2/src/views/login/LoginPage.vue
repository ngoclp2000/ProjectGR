<template>
  <div class="login-page">
    <div class="login-container flex flex-row">
      <div class="login-content-left  w-50">
        <div class="login-content-left-title">
          Đăng nhập
        </div>
        <div class="login-field-container flex flex-column">
          <div class="login-field-label">
            Tài khoản
          </div>
          <div class="login-field-input">
            <base-input placeholder="Nhập email hoặc số điện thoại" :modelValue="model.account"
              @update:modelValue="updateValue" field="account" @enterPress="login"></base-input>
          </div>
        </div>
        <div class="login-field-container flex flex-column">
          <div class="login-field-label">
            Mật khẩu
          </div>
          <div class="login-field-input">
            <base-input placeholder="Mật khẩu" type="password" :modelValue="model.password"
              @update:modelValue="updateValue" field="password" @enterPress="login"></base-input>
          </div>
        </div>
        <div class="login-button">
          <base-button text="ĐĂNG NHẬP" customClass="btn-white btn-padding w-100" @click="login">
          </base-button>
        </div>
        <div class="forgot-password flex flex-end color-red">
          Quên mật khẩu?
        </div>
      </div>
      <div class="login-content-right  w-50 flex flex-center flex-column">
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
          Bạn chưa có tài khoản ?
        </div>
        <div class="signup-button">
          <base-button text="ĐĂNG KÝ" customClass="btn-red btn-padding" @click="goToSignup">
          </base-button>
        </div>
      </div>
    </div>
    <snack-bar></snack-bar>
  </div>
</template>

<script>
import BaseButton from '@/components/button/BaseButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import { ref, getCurrentInstance, onMounted } from 'vue';
import AccountAPI from '@/apis/components/accountAPI';
import jwt_decode from "jwt-decode";
import SnackBar from '@/components/snackbar/SnackBar.vue';

export default {
  name: 'LoginPage',
  components: {
    BaseButton,
    BaseInput,
    SnackBar
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const model = ref({});
    const updateValue = (value, field) => {
      model.value[field] = value;
    }
    onMounted(() => {
      if (proxy.$store.state.token) {
        proxy.$router.push('/');
      }
    });

    const goToSignup = () => {
      proxy.$router.push("/signup");
    }
    const login = async () => {
      if (proxy.model) {
        try {
          let res = await AccountAPI.signIn(proxy.model);
          if (res && res.data && res.data.data) {
            const userInfo = jwt_decode(res.data.data.token);
            if (userInfo && typeof userInfo === 'object') {
              let payload = {
                userId: userInfo.userId,
                avatar: userInfo.avatar,
                fullName: userInfo.fullName,
                email: userInfo.email,
              };
              proxy.$store.dispatch("deleteAccount", payload);
              proxy.$store.dispatch("updateAccount", payload);
              proxy.$store.dispatch("updateToken", {
                token: res.data.data?.token,
                refreshToken: res.data.data?.refreshToken
              });
              proxy.$router.push('homepage');
            }
          } 
        } catch (e) {
          if(e && e.response.status){
            switch(e.response.status){
              case 404:
                proxy.$store.dispatch('changeSnackBar',{
                  isDisplay: true,
                  message: 'Mật khẩu không chính xác',
                  timeOut: 3000
                })
                break;
            }
          }
        }

      }
    }
    return {
      model,
      updateValue,
      goToSignup,
      login
    }
  }
}
</script>

<style lang="scss">
@import './LoginPage.scss';
</style>