import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import './assets/styles/variables.css';
import './assets/styles/primevue-override.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import PrimeVue from'./plugins/PrimeVue';
import router from './router';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.mount('#app');


