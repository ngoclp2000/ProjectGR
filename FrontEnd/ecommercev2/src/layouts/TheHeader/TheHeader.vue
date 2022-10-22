<!-- eslint-disable prettier/prettier -->
<template>
  <div class="header ">
    <div class="flex-between container">
      <div class="logo-container flex-between">
        <a href="/">
          <div class="logo">

          </div>
        </a>

      </div>

      <div class="search flex-row flex-center">
        <base-input placeholder="Nhập tên sản phẩm, mã sản phẩm, từ khóa cần tìm..." :width="widthSearchBar"
          rightIcon="search-red" :hasBorder="false"></base-input>
      </div>
      <div class="row-action flex-between">
        <div class="row-group account flex-row flex-center cursor-pointer" @click="goToLogin">
          <div class="icon24 account mr-4" v-if="!$store.state.account || !$store.state.account['userId']">

          </div>
          <div v-else class="avatar">
            <img :src="$store.state.account['avatar'] " alt="">
          </div>
          <div class="text text-white">
            {{ !$store.state.account || !$store.state.account['userId'] ? account : $store.state.account['fullName'] }}
          </div>
        </div>
        <v-menu>
          <div class="row-group flex-row flex-center cart">
            <div class="icon24 shopping-cart mr-4">

            </div>

            <!-- This will be the popover reference (for the events and position) -->
            <div class="text text-white ">
              {{ cartContent }}
            </div>
          </div>

          <!-- This will be the content of the popover -->
          <template #popper>
            <div class="product-cart-list">
              <div class="product-list-content flex flex-column">
                <div class="product-detail-content flex flex-row " v-for="(product, index) in listProductCard"
                  :key="index">
                  <div class="product-detail-content-img">
                    <img :src="product.productImage" alt="">
                  </div>
                  <div class="product-detail-content-main flex flex-column flex2">
                    <div class="product-detail-content-main-name">
                      {{ product.productName }}
                    </div>
                    <div class="product-detail-content-main-unit">
                      ĐVT: {{ product.productUnit }}
                    </div>
                    <div class="product-detail-content-main-quantity">
                      x{{ product.productQuantity }}
                    </div>
                  </div>
                  <div class="product-detail-content-price flex flex-end flex2">
                    {{ formatVND(product.productQuantity * product.productPrice) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="product-cart-summary flex flex-row flex-between">
              <div class="product-cart-total-product">
                Có tổng số {{ listProductCard?.length }} sản phẩm
              </div>
              <div class="product-cart-total-price">
                Tổng số: <span class="color-red">{{ formatVND(totalComputedMoney) }}</span>
              </div>
            </div>
            <div class="product-cart-action flex flex-row flex-between">
              <base-button text="Xem chi tiết" customClass="btn-white btn-padding no-active" @click="viewCart">
              </base-button>
              <base-button text="Thanh toán ngay" customClass="btn-red btn-padding no-active" @click="goToCheckout">
              </base-button>
            </div>
          </template>
        </v-menu>


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
import { ref, computed, getCurrentInstance } from "vue";
import baseInput from '@/components/input/BaseInput.vue';
import BaseButton from "@/components/button/BaseButton.vue";

import { useFormat } from '@/commons/format.js';
export default {
  components: {
    baseInput,
    BaseButton
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
    const { proxy } = getCurrentInstance();
    const account = ref("Tài khoản");
    const position = ref("Hà Nội");
    const widthSearchBar = ref(450);
    const { formatVND } = useFormat();
    const cartContent = computed(() => {
      let productList = proxy.$store.state.productCartList;
      return 'Giỏ hàng (' + productList?.length + ')';
    })
    const listProductCard = computed(() => {
      return proxy.$store.state.productCartList;
    })
    const totalComputedMoney = computed(() => {
      let total = 0;
      if (proxy.$store.state.productCartList) {
        proxy.$store.state.productCartList.forEach(item => total += item.productQuantity * item.productPrice);
      }
      return total;
    })
    const viewCart = () => {
      proxy.$router.push("/cart");
    }
    const goToCheckout = () => {
      proxy.$router.push("/checkout");
    }

    const goToLogin = () => {
      if(!(proxy.$store.state.account && proxy.$store.state.account["userId"] && proxy.$store.state.token)){
        proxy.$router.push("/login");
      }
    }

    return {
      menus,
      account,
      cartContent,
      position,
      widthSearchBar,
      listProductCard,
      formatVND,
      totalComputedMoney,
      viewCart,
      goToCheckout,
      goToLogin
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
