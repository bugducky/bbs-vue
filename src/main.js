// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import store from './store.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'default-passive-events'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

$cookies.config('7d');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
  },
  template: '<App/>'
})
