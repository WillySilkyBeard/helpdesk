import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
//import user from './modules/user'
import auth from './modules/auth'
import tasks from './modules/tasks'
import shared from './modules/shared'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tasks, shared, auth
    },
    plugins: [createPersistedState({
        paths:['auth']
      })]
})