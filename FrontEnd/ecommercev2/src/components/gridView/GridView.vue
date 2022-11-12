<template>
    <div ref="table" :id="idTable">
    </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables'; //import Tabulator library
import baseComponent from '@/components/base/BaseComponent.vue';
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
        api: {
            type: Object,
            default: null
        }
    },
    setup(props, { emits }) {
        const table = ref(props.idTable); //reference to your table element
        const tabulator = ref(null); //variable to hold your table
        const tableData = ref([
            { id: 1, name: "Billy Bob", age: 12, gender: "male", height: 95, col: "red", dob: "14/05/2010" },
            { id: 2, name: "Jenny Jane", age: 42, gender: "female", height: 142, col: "blue", dob: "30/07/1954" },
            { id: 3, name: "Steve McAlistaire", age: 35, gender: "male", height: 176, col: "green", dob: "04/11/1982" },
        ]); //data for table to display

        onMounted(async () => {
            if (props.api) {
                let request = await props.api.getDataTable();
                if (request != null) {
                    let data = request.data;
                    if (data != null) {
                        tableData.value = data.data;
                    }
                }
            }
            //instantiate Tabulator when element is mounted
            tabulator.value = new Tabulator(table.value, {
                data: tableData.value, //link data to table
                columns: props.columns,
                layout: props.layout,
                reactiveData: true, //turn on data reactivity
                pagination: "local",
                paginationSize: 1,
                paginationSizeSelector: [3, 6, 8, 10],
                movableColumns: true,
                paginationCounter: "rows",
            });
        })
        return { tabulator, table };
    }
});

</script>

<style>

</style>