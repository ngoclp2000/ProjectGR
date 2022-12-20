<template>
    <easy-data-table  :alternating="alternating" :buttons-pagination="buttonsPagination"
        :headers="headers" :items="items" @click-row="rowClick" v-model:items-selected="itemsSelected"
        :loading="loading" v-model:server-options="serverOptions" 
        multi-sort :theme-color="'#009879'" table-class-name="customize-table" header-text-direction="left" body-text-direction="left">
        <template #loading>
            <loading></loading>
        </template>
    </easy-data-table>
</template>

<script>
import { ref, getCurrentInstance, computed, onMounted, watch } from 'vue';
import Loading from '@/components/loading/Loading.vue';
export default {
    components: {
        Loading
    },
    props: {
        borderCell: {
            type: Boolean,
            default: true
        },
        alternating: {
            type: Boolean,
            default: true
        },
        buttonsPagination: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        api: {
            type: Object,
            default: null
        }
    },
    emits: ['rowClick'],

    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const itemsSelected = ref(props.multiple ? [] : null);
        const loading = ref(true);
        const headers = [
            { text: "ProductCode", value: "productCode", width: 200 },
            { text: "ProductName", value: "productName" },
            { text: "ProductPrice", value: "productPrice", sortable: true, width: 200 },
            { text: "ProductDiscount", value: "productDiscount", sortable: true, width: 200 },
            { text: "ProductQuantity", value: "productQuantity", sortable: true, width: 200 },
            { text: "ProductStatus", value: "productStatus", width: 200 },
        ];
        const serverOptions = ref({
            page: 1,
            rowsPerPage: 25,
            sortBy: [],
            sortType: []
        });
        const items = ref([]);

        /**
         * Sự kiện click row
         * tbngoc 19.11.2022
         */
        const rowClick = (item) => {
            emit('rowClick', item);
        }

        const getPayload = () => {
            let payload = serverOptions.value;
            return cloneDeep(payload);
        };

        onMounted(async () => {
            await loadData();
        });
        function cloneDeep(obj){
            return JSON.parse(JSON.stringify(obj))
        }
        const loadData = async () => {
            loading.value = true;
            let api = props.api;
            if (api) {
                let payload = getPayload();
                payload.size = payload.rowsPerPage;
                try {
                    let res = await api.getDataTable(payload);
                    if (res && res.data) {
                        items.value = res.data.data;
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    loading.value = false;
                }
            }
        }

        watch(serverOptions, async () => { await loadData() }, { deep: true });

        return { items, headers, rowClick, itemsSelected, loading, serverOptions };

    }
}
</script>
<style lang="scss">
    @import "./GridView.scss";
</style>