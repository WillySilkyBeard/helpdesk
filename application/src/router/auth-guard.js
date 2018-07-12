/* eslint-disable no-alert, no-console */
import store from '../store'

export default function (to, from, next) {
    console.log(store.getters.isUserAuthenticated)
    
    if (store.getters.isUserAuthenticated) {
        next()
    } else {
        //next('/login')
        next('/login?loginError=true')
    }
}