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
const app = createApp(App);


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
/* Khai báo thành phần dùng global */



app.use(router);
app.use(VueAgile);
app.use(VTooltip);
app.use(FloatingVue);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component('Dialog', Dialog);

app.mount('#app')
