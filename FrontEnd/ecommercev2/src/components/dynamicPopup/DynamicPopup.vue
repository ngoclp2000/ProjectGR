<template>
  <div>
    <vue-final-modal v-model="showModal">
      Modal Content Here
    </vue-final-modal>
    <button @click="showModal = true">Open Modal</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
    setup(props, { emit }){
        const showModal = ref(false);
        return {
            showModal
        }
    }
}
</script>

<style>

</style>