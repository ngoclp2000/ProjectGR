<template>
  <div>
    <!-- <grid-view :columns="x" :layout="'fitColumns'" :controller="productAPI.getController()" :paginationSizeSelector="y"
      locale="vi" :paginationSize="5">
    </grid-view> -->
    <!-- <base-select :options="value" :modelValue="testBindData" :label="'countryName'" :keyCache="'country'" 
        
    ></base-select> -->
    <grid-view  :api="productAPI"></grid-view>
    <dynamic-popup></dynamic-popup>
  </div>
</template>

<script>
import gridView from '@/components/gridView/GridView.vue';
import productAPI from '@/apis/components/productAPI';
import BaseSelect from '@/components/select/BaseSelect.vue';
import DynamicPopup from '@/components/dynamicPopup/DynamicPopup.vue';

import {ref} from 'vue';
export default {
  components: { gridView, BaseSelect ,DynamicPopup},
  setup() {
    const x = [
      { title: "Mã sản phẩm", field: "productCode", headerFilter: true },
      { title: "Tên sản phẩm", field: "productName", headerFilter: "input" },
      { title: "Giá sản phẩm", field: "productPrice", hozAlign: "center", headerFilter: "input", headerFilterFunc: "=" },
      { title: "Giá khuyến mãi", field: "productDiscount", hozAlign: "center", headerFilter: "input", headerFilterFunc: "=" },
      { title: "Số lượng", field: "productQuantity", hozAlign: "center", headerFilter: "input" },
      { title: "Trạng thái", field: "productStatus", hozAlign: "center", formatter: "tickCross", headerFilter: "input" },
    ];
    const y = [5, 10, 20, 50];

    const value = [
      {
        countryCode: "CA",
        countryName: "Canada"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      },
      {
        countryCode: "VN",
        countryName: "Vietnam"
      }
    ]
    const testBindData = ref();

    return { x, productAPI, y ,value,testBindData};
  }
}
</script>

<style>

</style>