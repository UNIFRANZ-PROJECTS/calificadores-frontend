import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios";

require("@/store/subscriber");

Vue.use(Toast);
const url = "http://localhost:3000/api";
// const url = 'https://reviewserver.online/api'

axios.defaults.baseURL = url;

const HTTP = axios.create({
  baseURL: url,
});
HTTP.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;
Vue.prototype.$http = HTTP;
store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  store.dispatch("auth/sendPerm", localStorage.getItem("permisions")).then(() => {
    new Vue({
      vuetify,
      router,
      render: (h) => h(App),
      store,
    }).$mount("#app");
  });
});
