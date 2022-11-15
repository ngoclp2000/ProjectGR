<template>
  <div>
    <grid-view :columns="x" :layout="'fitColumns'" :controller="productAPI.getController()" :paginationSizeSelector="y" locale="vi" :paginationSize="5">
    </grid-view>
  </div>
</template>

<script>
import gridView from '@/components/gridView/GridView.vue';
import productAPI from '@/apis/components/productAPI';
export default {
  components: { gridView },
  setup() {
    const x = [
      { title: "Mã sản phẩm", field: "productCode" ,headerFilter:true},
      { title: "Tên sản phẩm", field: "productName" ,headerFilter:"input"},
      { title: "Giá sản phẩm", field: "productPrice", hozAlign: "center",headerFilter:"input" ,headerFilterFunc:"="},
      { title: "Giá khuyến mãi", field: "productDiscount", hozAlign: "center",headerFilter:"input",headerFilterFunc:"=" },
      { title: "Số lượng", field: "productQuantity", hozAlign: "center" ,headerFilter:"input"},
      { title: "Trạng thái", field: "productStatus", hozAlign: "center",formatter:"tickCross",headerFilter:"input" },
    ];
    const y = [5,10,20,50];
    return { x,productAPI ,y};
  }
}
</script>

<style>

</style>