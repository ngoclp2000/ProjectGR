<template>
  <div class="grid-product-card">
    <div class="grid-product-card-title">
      Sản phẩm khuyến mãi
    </div>
    <div class="product-container">
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
      <product-card></product-card>
    </div>
  </div>

</template>

<script>
import ProductCard from "@/components/card/ProductCard.vue";
export default {
  name : "GridProductCard",
  components:{
    ProductCard
  },
  props:{
    
  },
  setup(props, {emit}){
    return {
      
    }
  }
}
</script>

<style lang="scss">
.grid-product-card{
  .grid-product-card-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    color: #333333;
    line-height: 24px;
    font-size: 18px;
    font-weight: 600;
  }
  .product-container{
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap : 5px;
    background-color: #fff !important;
  }
}
</style>