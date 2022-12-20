<template>
    <div class="range-filter">
        <div class="header-filter" @click="triggerToggle">
            <div class="name-filter">
                {{ objectData?.name }}
            </div>
            <div class="icon-toggle icon24 next" :class="{ 'toggle': toggle }">

            </div>
        </div>
        <div class="filter-content" :class="{ 'toggle': toggle }">
            <Slider v-model="range" :min="objectData?.data.min" :max="objectData?.data.max" :format="format" @change="rangeChange"/>
        </div>
    </div>
</template>

<script>
import Slider from '@vueform/slider';
import { onMounted, ref } from '@vue/runtime-core';
export default {
    components: {
        Slider,
    },
    props: {
        objectData: {
            type: Object,
            default: null
        }
    },
    emit:[
        "filterChange"
    ],
    setup(props, { emit }) {
        const toggle = ref(false);
        let range = ref([0,0]);
        const triggerToggle = () => {
            toggle.value = !toggle.value;
        }
        onMounted(() => {
            range.value = [props.objectData?.data.min, props.objectData?.data.max];
        })
        const format = (value) => {
            let formatValue = value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return `${formatValue} đ`;
        }

        const rangeChange = (value) =>{
            emit("filterChange",value,props.objectData.field,props.objectData.type);
        }

        return {
            range,
            toggle,
            triggerToggle,
            format,
            rangeChange
        }
    }
}
</script>

<style lang="scss">
@import "@vueform/slider/themes/default.css";
@import "@/assets/scss/_variables.scss";

.range-filter {
    margin-top: 20px;
    background: #ffffff;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;

    .icon-toggle {
        transition: all 0.3s ease;
        rotate: 90deg;

        &.toggle {
            rotate: 270deg;
        }
    }

    .filter-content {
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 5px 10px;
        padding-right: 0px;
        height: auto;
        transition: all 0.15s ease-out;

        &.toggle {
            height: 0px;
            padding: 0;
            overflow: hidden;
            margin-top: 0px;
            transition: all 0.25s ease-in;
        }
    }

    .header-filter {
        cursor: pointer;

        &:hover {
            .name-filter {
                color: #ffd55d;
            }
        }

        .name-filter {
            font-weight: $font-weight-bold;
            font-size: 16px;

        }

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>