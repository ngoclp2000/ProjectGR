<template>
<div id="app">
  <router-view/>
  <toast/>
  <teleport :to="loadingPlace">
    <loading v-if="IsLoading"></loading>
  </teleport>
</div>
</template>

<script>
import Toast from 'primevue/toast';
import Loading from '@/components/loading/Loading.vue';
import { ref,computed,getCurrentInstance,onMounted} from 'vue';
export default {
  name: 'App',
  components: {
    Toast,
    Loading
  },
  setup(){
    const {proxy} = getCurrentInstance();
    const IsLoading = computed(() =>{
      return proxy.$store.state.isLoading;
    })

    const loadingPlace = computed(() =>{
      return proxy.$store.state.loadingPlace || "body";
    });

    return{
      IsLoading,
      loadingPlace,
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
