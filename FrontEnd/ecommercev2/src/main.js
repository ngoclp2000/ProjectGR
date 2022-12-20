import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/scss/main.scss";
import router from '@/routers';
import FloatingVue from 'floating-vue'
import VueAgile from 'vue-agile'
import VTooltip from 'v-tooltip'
import store from '@/store/store.js';
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import { vfmPlugin } from 'vue-final-modal';
import Datepicker from '@vuepic/vue-datepicker';
import { Skeletor } from 'vue-skeletor';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  })

/* Styles */

import '@/assets/css/flexbox.css';
import '@/assets/scss/icons.scss';
import '@/assets/scss/control.scss';
import '@/assets/scss/override.scss';
import 'floating-vue/dist/style.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'tabulator-tables/dist/css/tabulator_semanticui.min.css';
import 'vue3-easy-data-table/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-skeletor/dist/vue-skeletor.css';
import '@mdi/font/css/materialdesignicons.css';

/* Khai báo thành phần dùng global */



app.use(router);
app.use(VueAgile);
app.use(VTooltip);
app.use(FloatingVue);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(vuetify);
app.use(vfmPlugin);

app.component('Dialog', Dialog);
app.component('easy-data-table', Vue3EasyDataTable);
app.component('date-picker', Datepicker);
app.component('skeletor',Skeletor);
app.mount('#app')
