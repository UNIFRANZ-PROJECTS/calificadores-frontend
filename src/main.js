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
const url = process.env.HOSTNAME1;

axios.defaults.baseURL = url;

const HTTP = axios.create({
  baseURL: url,
});

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
