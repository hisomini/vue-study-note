import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import VueCookie from 'vue-cookie';
import common from '@/common/common.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from '@/plugins/vuetify'



Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(VueCookie);
Vue.use(common);
// Vue.use(Vuetify);

new Vue({
  render: h => h(App),
  router: router,
  vuetify
}).$mount('#app')

