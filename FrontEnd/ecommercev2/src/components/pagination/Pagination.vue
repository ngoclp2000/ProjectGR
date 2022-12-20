<template>
    <div class="pagination">
        <div>

        </div>
        <v-pagination 
        v-model="currentPage" 
        :length="numberOfPages" 
        rounded="circle"
        :active-color="'#ffffff'"
        :size="'42px'"
        @update:modelValue="pageChange"
        :total-visible="5"
        ></v-pagination>
        <div>
            
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
export default {
    props: {
        numberOfPages: {
            type: Number,
            default: null
        }
    },
    emits: ['pageChange'],
    setup(props, { emit }) {
        const currentPage = ref(1);
        
        const pageChange = (page) => {
            emit('pageChange',page);
        }




        return {
            pageChange,
            currentPage
        }
    }
}
</script>

<style lang="scss">
@import "./Pagination.scss";
</style>