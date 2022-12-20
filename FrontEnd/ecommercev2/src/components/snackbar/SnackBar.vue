<template>
  <v-snackbar
      v-model="snackbar.isDisplay"
      :timeout="snackbar.timeOut"
    >
      {{ snackbar.message || 'Đây là thông báo' }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="closeSnackbar"
        >
          Close
        </v-btn>

      </template>
    </v-snackbar>
</template>

<script>
import {ref,getCurrentInstance,computed} from 'vue';
export default {
    setup(props,{emit}){
        const {proxy} = getCurrentInstance();

        const snackbar = computed(() => {
            return proxy.$store.state.snackBar;
        });

        const closeSnackbar = () =>{
            let currentSnackbar = proxy.$store.state.snackBar;
            currentSnackbar.isDisplay = false;
            proxy.$store.dispatch('changeSnackBar',currentSnackbar);
        }

        return{
            snackbar,
            closeSnackbar
        }
    }
}
</script>

<style>

</style>