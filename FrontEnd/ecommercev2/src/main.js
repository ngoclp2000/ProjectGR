import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/scss/main.scss";
import router from '@/routers';
import FloatingVue from 'floating-vue'
import VueAgile from 'vue-agile'
import VTooltip from 'v-tooltip'
import store from '@/store/store.js';

const app = createApp(App);


/* Styles */

import '@/assets/css/flexbox.css';
import '@/assets/scss/icons.scss';
import '@/assets/scss/control.scss';
import '@/assets/scss/override.scss';
/* Khai báo thành phần dùng global */



app.use(router);
app.use(VueAgile);
app.use(VTooltip);
app.use(FloatingVue);
app.use(store);

app.mount('#app')
