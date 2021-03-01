import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/// /////////////////////////////////////
import FullCalendar from 'vue-full-calendar'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

Vue.use(FullCalendar)
Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
