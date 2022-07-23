<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header">
    <div class="flex-between container">
      <div class="logo-container flex-between">
        <div class="logo">

        </div>
        <div>
          Shopping
        </div>
      </div>

      <div class="search">
        <input type="text">
      </div>
      <div class="row-action flex-between">
        <div class="account">
          <div class="icon">

          </div>
          <div class="text">
            {{ account }}
          </div>
        </div>
        <div class="cart">
          <div class="icon">

          </div>
          <div class="text">
            {{ cartContent }}
          </div>
        </div>
        <div class="position">
          <div class="icon">

          </div>
          <div class="text">
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
export default {
  components: {
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
    return {
      menus,
      account,
      cartContent,
      position
    };
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style lang="scss">
@import "@/assets/scss/main.scss";

.header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100px;
  background-color: var(--color-background-header);
  @import "./TheHeader.scss";
}
</style>
