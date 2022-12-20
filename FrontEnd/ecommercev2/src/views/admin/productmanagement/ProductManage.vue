<template>
  <div class="product-manage" id="product-manage-admin">
    <div class="label">
      Product
    </div>
    <div class="product-manage-content flex-row">
      <div class="filter-container  flex1 flex-column ">
        <div class="header flex-row flex-between">
          <div class="filter-label">
            Filter
          </div>
          <base-button text="Reset" customClass="btn-white btn-padding " @click="resetFilter"></base-button>
        </div>
        <div class="filter-content flex-column">
          <template v-for="(item, index) in filterOptions" :key="index">
            <component :is="item?.type" :objectData="item" @filterChange="handleFilterChange" :ref="item?.field">

            </component>
          </template>
        </div>
      </div>
      <div class="product-list flex4" id="product-list-id">
        <div class="sort-filter">
          <div class="add-product">
            <base-button text="Add Product" customClass="btn-white btn-padding " @click="addProduct"></base-button>
          </div>
          <base-select :label="'Filter'" 
          :width="250" displayField="value"
          valueField="key"
          :items="sortDataOptions"
          @optionChange="handleSortChange"
          ></base-select>
        </div>
        <div class="product-list-container">
          <product-card v-for="(product, index) in productListManage" :key="index" :objectProduct="product"
            :hasButton="false" :customClickEvent="customClickProductCard">
          </product-card>
        </div>
        <div v-if="productListManage.length == 0" class="flex-column flex-center">
          <div class="no-data">

          </div>
          <div>
            No data
          </div>
        </div>
        <pagination v-if="maxPage > 0" :numberOfPages="maxPage" @pageChange="pageChange"></pagination>
      </div>

    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/button/BaseButton.vue';
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import ProductAPI from '@/apis/components/productAPI';
import { useFunctionCommon } from '@/setup/function.js';
import { useAdminPage } from '@/views/admin/AdminPage.js';
import TreeFilter from '@/components/filter/TreeFilter.vue';
import RangeFilter from '@/components/filter/RangeFilter.vue';
import StarFilter from '@/components/filter/StarFilter.vue';
import commonFunction from '@/commons/commonFunc';
import ProductCard from "@/components/card/ProductCard.vue";
import ProductFilterType from '@/shared/enum/ProductFilterType';
import commonFunc from '@/commons/commonFunc';
import Pagination from '@/components/pagination/Pagination.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
import { useProductManage } from './ProductManageData';


export default {
  components: {
    BaseButton,
    TreeFilter,
    RangeFilter,
    StarFilter,
    ProductCard,
    Pagination,
    BaseSelect
  },
  setup(props, { emits }) {
    const { changeChosenTabMenuItem } = useAdminPage();
    const productListManage = ref([]);
    const filterOptions = ref([]);
    const { handleFilterType } = useFunctionCommon();
    const { proxy } = getCurrentInstance();
    const keepingFilterManage = ref({});
    const maxPage = ref(0);
    const {sortDataOptions,handleSortDataOption,defaultFilterOptions} = useProductManage();


    const serverOptions = ref(commonFunction.cloneDeep(defaultFilterOptions));

    const resetFilter = () => {
      serverOptions.value = commonFunction.cloneDeep(defaultFilterOptions);

      filterOptions.value.forEach(item => {
        let keepingObject = keepingFilterManage.value.find(x => x.field == item.field);
        switch (item.type) {
          case 'TreeFilter':
            item.data.forEach(x => {
              x.toggle = false;
              if (x.children && Array.isArray(x.children)) {
                x.children.forEach(y => y.chosen = false);
              }
            });
            break;
          case 'RangeFilter':
            proxy.$refs[item.field][0].range = [keepingObject.data.min, keepingObject.data.max];
            break;
          case 'StarFilter':
            proxy.$refs[item.field][0].resetRating();
            break;
        }
      });
    }


    const getPayload = () => {
      let payload = serverOptions.value;
      return commonFunction.cloneDeep(payload);
    };

    const loadData = async () => {
      commonFunction.mask("#product-list-id");
      let payload = getPayload();
      try {
        let res = await ProductAPI.getProductList(payload);
        if (res && res.data) {
          productListManage.value = res.data.data;
          maxPage.value = res.data.last_page;
        }
      } catch (e) {
        console.log(e);
      } finally {
        commonFunction.unmask();
      }
    }

    onMounted(async () => {
      await changeChosenTabMenuItem('product');

      try {
        commonFunction.mask();
        var res = await ProductAPI.getProductManage();
        if (res && res.data) {
          let filterList = [...res.data];
          if (Array.isArray(filterList)) {
            filterList.forEach(item => {
              item.data = handleFilterType(item);
            });
          }
          filterOptions.value = filterList;
        }
        keepingFilterManage.value = commonFunc.cloneDeep(filterOptions.value);
        await proxy.loadData();

      } finally {
        commonFunction.unmask();
      }

    });

    const handleFilterChange = (value, field, type) => {
      if (serverOptions.value != null && serverOptions.value.filter != null) {
        let findExistFilter = serverOptions.value.filter.find(item => item.field == field);
        if (findExistFilter != null) {
          switch (type) {
            case ProductFilterType.Range:
              findExistFilter.value = value;
              break;
            case ProductFilterType.Rate:
              findExistFilter.value = value;
              break;
            default:
              findExistFilter.value = value[field];
              break;
          }
        } else {
          switch (type) {
            case ProductFilterType.Range:
              serverOptions.value.filter.push({
                type: "between",
                value: value,
                field
              })
              break;
            case ProductFilterType.Rate:
              serverOptions.value.filter.push({
                type: "=",
                value: value,
                field
              })
              break;
            default:
              serverOptions.value.filter.push({
                type: "=",
                value: value[field],
                field
              })
              break;
          }
        }
      }
    }


    const pageChange = (page) => {
      serverOptions.value.page = page;
    };

    const handleSortChange = (option) =>{
      const sortObject = handleSortDataOption(option);
      if(sortObject){
        serverOptions.value.sortType = [sortObject.sortType];
        serverOptions.value.sortBy = [sortObject.sortBy];
      }
    }

    const customClickProductCard = (data) =>{
      console.log(data);
    };

    const addProduct = () => {

    }


    watch(serverOptions, async () => { await loadData() }, { deep: true });

    return {
      filterOptions,
      productListManage,
      loadData,
      handleFilterChange,
      resetFilter,
      keepingFilterManage,
      maxPage,
      pageChange,
      sortDataOptions,
      handleSortChange,
      customClickProductCard,
      addProduct
    }
  }
}
</script>

<style lang="scss">
@import './ProductManage.scss';
</style>