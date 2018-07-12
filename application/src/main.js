import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import 'vuetify/dist/vuetify.min.css'
//import Authentication from '@/components/pages/Authentication'

Vue.use(Vuetify)
Vue.use(VueCookie)
Vue.use(VueResource)

Vue.config.productionTip = false
//Authentication.checkAuthentication()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    this.$store.dispatch('checkAuthentication')
  }
})
