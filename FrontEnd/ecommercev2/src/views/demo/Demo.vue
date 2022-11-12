<template>
  <div>
    <grid-view :columns="x" :layout="'fitColumns'" :api="productAPI"></grid-view>
  </div>
</template>

<script>
import gridView from '@/components/gridView/GridView.vue';
import productAPI from '@/apis/components/productAPI';
export default {
  components: { gridView },
  setup() {
    const x = [
      { title: "Mã sản phẩm", field: "productCode" },
      { title: "Tên sản phẩm", field: "productName" },
      { title: "Giá sản phẩm", field: "productPrice", hozAlign: "center" },
      { title: "Giá khuyến mãi", field: "productDiscount", hozAlign: "center" },
      { title: "Số lượng", field: "productQuantity", hozAlign: "center" },
      { title: "Trạng thái", field: "productStatus", hozAlign: "center",formatter:"tickCross" },
    ];
    return { x,productAPI };
  }
}
</script>

<style>

</style>