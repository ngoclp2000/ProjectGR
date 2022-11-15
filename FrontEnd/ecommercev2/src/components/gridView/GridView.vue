<template>
    <div ref="table" :id="idTable">
    </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent, getCurrentInstance } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables'; //import Tabulator library
import baseComponent from '@/components/base/BaseComponent.vue';
import { userGridViewCommon } from './GridViewCommon';
import APIConfig from '@/apis/config/apiconfig.js';

export default defineComponent({
    extends: baseComponent,
    name: "gridView",
    props: {
        idTable: {
            type: String,
            default: "idTable"
        },
        columns: {
            type: Object,
            default: null
        },
        /**
         * Đây là dạng layout: 
         *      fitDataFill:  the table will resize the columns to fit their data, and ensure that rows takeup the full width of the table.
         *      fitDataStretch:  the table will resize the columns to fit their data, and stretch the final column to fill up the remaining width of the table.
         *      fitDataTable: Tables will automatically resize container and columns to fit the data
         *      fitColumns: the table will resize columns so that they fit perfectly inside the width of the container.
         *              Note:   In this layout mode, columns without a `width` set are resized to fill any remaining space on the table. 
         *                      If all columns cannot fit on the table then a scrollbar will appear.
                                The `widthGrow` and `widthShrink` column definition properties can be used to set how much each column grows or shrinks by.
         */
        layout: {
            type: String,
            default: "fitDataTable"
        },
        controller: {
            type: String,
            default: null
        },
        paginationSize: {
            type: Number,
            default: 20
        },
        paginationSizeSelector: {
            type: Object,
            default: null
        },
        locale: {
            type: String,
            default: "en"
        }
    },
    setup(props, { emits }) {
        const { proxy } = getCurrentInstance();
        const table = ref(props.idTable); //reference to your table element
        const tabulator = ref(null); //variable to hold your table
        const firstLoad = ref(true);
        const tableData = ref([

        ]); //data for table to display

        const { localizationConfig } = userGridViewCommon();

        onMounted(async () => {
            let controller = "";
            if (props.controller) {
                controller = props.controller;
                // let request = await props.api.getDataTable();
                // if (request != null) {
                //     let data = request.data;
                //     if (data != null) {
                //         tableData.value = data.data;
                //     }
                // }
            }
            //instantiate Tabulator when element is mounted
            tabulator.value = new Tabulator(table.value, {
                columns: props.columns,
                layout: props.layout,
                pagination: true,
                paginationMode: "remote",
                paginationSize: props.paginationSize,
                paginationSizeSelector: props.paginationSizeSelector,
                movableColumns: true,
                paginationCounter: "rows",
                locale: props.locale,
                langs: localizationConfig,
                ajaxURL: `${APIConfig}${controller}/dataTable`,
                ajaxConfig: "POST", //ajax HTTP request type
                ajaxContentType: "json", // send parameters to the server as a JSON encoded string
                columnHeaderSortMulti:true,
                filterMode:"remote",
            });
            tabulator.value.on("pageSizeChanged", handlePageSizeChanged);
            tabulator.value.on("pageLoaded", handlePageNoChange);

            //tabulator.value.setLocale("vi");
        })

        /**
         * Sự kiện đổi số bản ghi trên 1 trang
         * tbngoc   13.11.2022
         */
        const handlePageSizeChanged = (pagesize) => {
            if (!firstLoad.value) {
                console.log(pagesize);
            } else {
                // Load
                firstLoad.value = !firstLoad.value;
            }
        };

        const handlePageNoChange = (pageNo) => {
            if (!firstLoad.value) {
                console.log('Trang số' + pageNo);
            } else {
                firstLoad.value = !firstLoad.value;
            }
        };


        return { tabulator, table, handlePageSizeChanged };
    }
});

</script>

<style>

</style>