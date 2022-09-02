<template>
    <div class="base-radio flex flex-row">
        <div class="base-radio-container" v-for="(radio, index) in listRadio" :key="index">
            <radio-button :id="radio.group + index" :name="radio.group" :value="radio.value" v-model="chosenValue" />
            <label :for="radio.group + index">{{radio.label}}</label>
        </div>
    </div>
</template>

<script>
import RadioButton from 'primevue/radiobutton';
import { ref,watch,onMounted } from 'vue';
export default {
    name: "BaseRadio",
    components: {
        RadioButton
    },
    props: {
        listRadio: {
            type: Object,
            default: null
        },
        modelValue:{
            type : Object,
            default: null
        },
        field:{
            type: String,
            default: null
        }
    },
    setup(props,{emit}) {
        const chosenValue = ref();

        onMounted(()=>{
            chosenValue.value = props.modelValue;
        })

        watch(()=> chosenValue.value, (value)=>{
            emit("update:modelValue",value,props.field);
        })
        return {
            chosenValue
        }
    }
}
</script>

<style lang="scss" >
@import './BaseRadio.scss';
</style>