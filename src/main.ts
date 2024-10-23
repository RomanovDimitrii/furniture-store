import { createApp } from 'vue';

import App from './App.vue';

import './vendor/normalize.css';
import './assets/styles/main.css';
import store from './store';

const app = createApp(App);
app.use(store);
app.mount('#app');
