<template>
  <div class="grid-product-card">
    <div class="grid-product-card-title">
      Sản phẩm khuyến mãi
    </div>
    <div class="product-container">
      <product-card v-for="(product, index) in productList" :key="index" :productId="product.productId"
        :productDiscount="product.productDiscount" :productName="product.productName" :productUnit="product.productUnit"
        :productPrice="product.productPrice" :productOldPrice="product.productOldPrice" :productImage="product.productImage">

      </product-card>
    </div>
  </div>

</template>

<script>
import ProductCard from "@/components/card/ProductCard.vue";
export default {
  name: "GridProductCard",
  components: {
    ProductCard
  },
  props: {
    productList: {
      type: Array,
      default: null
    }
  },
  setup(props, { emit }) {
    return {

    }
  }
}
</script>

<style lang="scss">
.grid-product-card {
  .grid-product-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    color: #333333;
    line-height: 24px;
    font-size: 18px;
    font-weight: 600;
  }

  .product-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    background-color: #fff !important;
  }

  @media only screen and (max-width: 414px) {
    .product-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>