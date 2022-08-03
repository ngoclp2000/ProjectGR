<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header ">
    <div class="flex-between container">
      <div class="logo-container flex-between">
        <a href="/"><div class="logo" >

        </div></a>
        
      </div>

      <div class="search flex-row flex-center">
        <base-input
        placeholder="Nhập tên sản phẩm, mã sản phẩm, từ khóa cần tìm..."
        :width="widthSearchBar"
        rightIcon="search-red"
        ></base-input>
      </div>
      <div class="row-action flex-between">
        <div class="row-group account flex-row flex-center">
          <div class="icon24 account mr-4">

          </div>
          <div class="text text-white">
            {{ account }}
          </div>
        </div>
        <div class="row-group flex-row flex-center cart">
          <div class="icon24 shopping-cart mr-4">

          </div>
          <div class="text text-white ">
            {{ cartContent }}
          </div>
        </div>
        <div class="row-group flex-row flex-center position">
          <div class="icon24 position mr-4">

          </div>
          <div class="text text-white">
            {{ position }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import { ref } from "vue";
import baseInput from '@/components/input/BaseInput.vue';
export default {
  components: {
    baseInput
  },
  setup() {
    const menus = ref([{
      text: "Home",
      isActive: true,
      route: '/home'
    }, {
      text: "Shop",
      isActive: true,
      route: '/shop'
    }, {
      text: "Service",
      subMenus: [{
        text: "Shopping Card",
        route: '/shopping-cart'
      }, {
        text: "Check out",
        route: '/check-out'
      }]
    }, {
      text: "Contact",
      isActive: true,
      route: '/contact'
    }]);

    const account = ref("Tài khoản");
    const cartContent = ref("Giỏ hàng (0)");
    const position = ref("Hà Nội");
    const widthSearchBar = ref(450);
    return {
      menus,
      account,
      cartContent,
      position,
      widthSearchBar
    };
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style lang="scss">
@import "@/assets/scss/main.scss";

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 78px;
  background-color: var(--color-background-header);
  @import "./TheHeader.scss";
}
</style>
