<template>
  <div class="dashboard">
    <div class="label">
      Dashboard
    </div>
    <div class="summary-information">
      <div :class="'flex1 summary-information-item ' + item.class" v-for="(item, index) in summaryInformationObject"
        :key="index">
        <div class="icon-container">
          <div :class="item.iconClass"></div>
        </div>
        <div class="content-container">
          <div>
            {{ item.name }}
          </div>
          <div class="value" :title="item.value">
            {{ item.value }}
          </div>
        </div>
      </div>

    </div>
    <div class="summary-detail-information">
      <div class="filter-container">
        <div class="left-filter">
          <div class="duration-tag-list">
            <div class="duration-item" :class="{ 'selected': item.isSelected }" v-for="(item, index) in durationList"
              :key="index" @click="durationItemClick(item.key)">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="right-filter">
          <date-picker v-model="dateFilter" range placeholder="Select range to filter" :format="formatDateRange"
            :previewFormat="formatPreviewDateRange" @update:modelValue="dateFilterChange" />
        </div>
      </div>
      <div class="summary-detail-content">
        <div class="summary-detail-content-item" v-for="(item, index) in summaryDetailInformationObject" :key="index">
          <div class="main-information">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="value">
              {{ item.value }}
            </div>
          </div>
          <div :class="'icon-container ' + item.key">
            <div :class="item.iconClass">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-label">
        Sales Status
      </div>
      <div class="chart-content">
        <div class="flex1">
          <bar-chart></bar-chart>
        </div>
        <div class="flex1">
          <bar-chart></bar-chart>
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-label">
        Status
      </div>
      <div class="chart-content">
        <div class="flex1">
          <line-chart></line-chart>
        </div>
      </div>

    </div>
    <div class="flex-row divide-container">
      <div class="chart-container flex1">
        <div class="chart-label">
          Status
        </div>
          <div class="chart-content ">
            <div class="flex1 flex-row donoughnut">
              <div class="flex1">
                <doughnut-chart></doughnut-chart>
              </div>
              <div class="flex1">
                <doughnut-chart></doughnut-chart>

              </div>
          </div>
        </div>
      </div>
      <div class="chart-container flex1">
      <div class="chart-label">
        Sales Status
      </div>
      <div class="chart-content">
        <div class="flex1">
          <bar-chart></bar-chart>
        </div>
      </div>
    </div>
    </div>

    <div class="transaction-history">
      <div class="label">
        Transaction History
      </div>
      <div class="transaction-history-content">
        <grid-view  :api="productAPI"></grid-view>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from '@vue/runtime-core';
import { useDashboard } from './Dashboard.js';
import BarChart from '@/components/chart/barchart/BarChart.vue';
import LineChart from '@/components/chart/linechart/LineChart.vue';
import DoughnutChart from '@/components/chart/doughnut/DoughnutChart.vue';
import gridView from '@/components/gridView/GridView.vue';
import productAPI from '@/apis/components/productAPI';
import {useAdminPage}  from '@/views/admin/AdminPage.js';

export default {
  components: {
    BarChart,
    LineChart,
    DoughnutChart,
    gridView
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const summaryInformationObject = ref([]);
    const summaryDetailInformationObject = ref([]);
    const { durationList, formatDateRange, formatPreviewDateRange, customSummaryInformationObject, customSummaryDetailInformationObject } = useDashboard();
    const {changeChosenTabMenuItem} = useAdminPage();
    const dateFilter = ref();
    onMounted(async () => {
      // trigger chọn tab
      await changeChosenTabMenuItem('dashboard');


      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      dateFilter.value = [startDate, endDate];

      proxy.summaryInformationObject = customSummaryInformationObject;
      proxy.summaryDetailInformationObject = customSummaryDetailInformationObject;
    })

    /**
     * Sự kiện click chọn duration
     * @param {String} key 
     */
    const durationItemClick = (key) => {
      durationList.forEach(item => {
        if (item.key == key) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      });

      // xỬ lý tích chọn duration
    }

    /**
     * Thực hiện filter khi thay đổi rangeDate
     * @param {*} modelData 
     */
    const dateFilterChange = (modelData) => {
    }

    return {
      summaryInformationObject,
      durationList,
      durationItemClick,
      dateFilter,
      formatDateRange,
      formatPreviewDateRange,
      dateFilterChange,
      summaryDetailInformationObject,
      productAPI
    }
  }
}
</script>

<style lang="scss" >
@import './Dashboard.scss';
</style>