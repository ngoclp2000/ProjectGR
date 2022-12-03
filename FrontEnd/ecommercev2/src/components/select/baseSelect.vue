<template>
    <div class="base-select">
        <v-select :label="label" :options="paginated" :filterable="false" @open="onOpen" @close="onClose"
            autoscroll append-to-body @search="fetchOptions">
            <template #no-options>Không có bản ghi nào phù hợp!</template>
            <template #list-footer>
                <li v-show="hasNextPage" ref="load" class="loader">
                    Đang tải...
                </li>
            </template>


            <template #footer>
                <div style="opacity: 0.8">
                    Error
                </div>
            </template>

        </v-select>
    </div>
</template>

<script>
import { ref, watch, onMounted, getCurrentInstance, computed } from 'vue';
export default {
    name: "BaseSelect",
    components: {
    },
    props: {
        modelValue: {
            type: Object,
            default: null
        },
        field: {
            type: String,
            default: null
        },
        label: {
            type: String,
            default: null
        },
        keyCache:{
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const selected = ref();
        const options = ref([]);
        const observer = ref(null);
        const limit = ref(10);
        const search = ref('');

        const infiniteScroll = async ([{ isIntersecting, target }]) => {
            if (isIntersecting) {
                const ul = target.offsetParent;
                const scrollTop = target.offsetParent.scrollTop;

                proxy.limit += 10;
                await proxy.$nextTick();
                ul.scrollTop = scrollTop;
            }
        };

        const onClose = () => {
            proxy.observer.disconnect();
        }

        const onOpen = async () => {
            if (proxy.hasNextPage) {
                await proxy.$nextTick()
                proxy.observer.observe(proxy.$refs.load);
            }
        }

        onMounted(() => {
            proxy.observer = new IntersectionObserver(proxy.infiniteScroll);
        });

        watch(() => selected.value, (value) => {
            emit("update:modelValue", value, props.field);
        })

        const filtered = computed(() => {
            return proxy.options.filter((item) => item[props.label].includes(proxy.search))
        });
        const paginated = computed(() => {
            return proxy.filtered.slice(0, proxy.limit)
        });
        const hasNextPage = computed(() => {
            return proxy.paginated.length < proxy.filtered.length
        });

        const fetchOptions = async(search, loading)=>{
            // proxy.options = [{
            //     countryName : "asdasd"
            // }]
        }
        
        
        return {
            selected,
            onClose,
            infiniteScroll,
            onOpen,
            filtered,
            paginated,
            hasNextPage,
            search,
            limit,
            observer,
            fetchOptions,
            options
        }
    }
}
</script>

<style lang="scss" >
@import './BaseSelect.scss';
</style>