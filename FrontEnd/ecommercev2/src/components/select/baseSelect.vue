<template>
    <div class="base-select" :style="{ width: `${width}px !important` }">
        <v-select :label="label" 
        :items="data"
        :item-title="displayField"
        :item-value="valueField"
        :filterable="false" density="compact"
        @update:modelValue="optionChange"
        prepend-inner-icon="mdi-filter"
        hide-details
        >

        </v-select>
    </div>
</template>

<script>
import { ref, watch, onMounted, getCurrentInstance, computed } from 'vue';
export default {
    name: "BaseSelect",
    components: {
    },
    emits: ["optionChange"],
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
        width:{
            type: Number,
            default: null
        },
        query:{
            type: String,
            default: 'local'
        },
        items:{
            type: Array,
            default: () => {
                return [];
            }
        }, 
        displayField:{
            type: String,
            default: null
        },
        valueField:{
            type: String,
            default: null
        }
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();
        const data = ref([]);

        onMounted(() => {
            if(props.query != 'local') {
                //
            }else{
                data.value = props.items;
            }
        });

        const optionChange = (option)=>{
            emit('optionChange', option);
        }
        
        return {
            data,
            optionChange
        }
    }
}
</script>

<style lang="scss" >
@import './BaseSelect.scss';
</style>