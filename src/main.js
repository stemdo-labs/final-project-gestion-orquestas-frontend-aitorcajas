import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './helpers/axiosInterceptor';

import { BootstrapVue } from 'bootstrap-vue';

import 'jquery/src/jquery';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/../node_modules/vc-chord-diagram/dist/lib/vc-chord-diagram.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';
import formatMixin from './mixins/FormatMixin';

import TextInput from './components/UI/TextInput.vue';
import VueQRCodeComponent from 'vue-qrcode-component';
import VueToastr from "vue-toastr";
// use plugin
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});
Vue.component('qr-code', VueQRCodeComponent)

Vue.use(BootstrapVue);
Vue.component('text-input', TextInput);
Vue.component('multiselect', Multiselect);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import vuetify from './plugins/vuetify';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.mixin(formatMixin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
