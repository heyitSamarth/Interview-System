import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axiosInstance from './plugins/axios'


import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"

const app = createApp(App);
console.log(app);
app.config.globalProperties.$http = axiosInstance;
app.use(store).use(router).mount('#app');