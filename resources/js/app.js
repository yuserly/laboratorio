import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import router from "./routes";
import store from "./state/store";
import "./assets/scss/app.scss";
import App from "./App.vue";
import vco from "v-click-outside";
import VueSweetalert2 from "vue-sweetalert2";
import VueSlideBar from "vue-slide-bar";
import Vuelidate from "vuelidate";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
import VueAxios from "vue-axios";
import { perfil } from "./perfil";

import Permissions from './Permissions.vue';
Vue.mixin(Permissions);
Vue.config.productionTip = false;
Vue.component("VueSlideBar", VueSlideBar);
Vue.use(BootstrapVue);
Vue.use(vco);
Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.component("apexchart", VueApexCharts);
Vue.prototype.$urlBackend = "https://admin.lodevuelvo.cl/";
Vue.use(VueAxios, axios);

// perfil();


// Vue.component("app", require("./App.vue"));


Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});


Vue.filter('uppercase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  })

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});