import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
//import * as Auth from '@/components/pages/Authentication'
// pages
import Home from '@/components/Home'
import Task from '@/components/Ads/Task'
import tasksList from '@/components/Ads/tasksList'
import NewAd from '@/components/Ads/NewAd'
import Authentication from '@/components/pages/Authentication/Authentication'
// import Login from '@/components/Auth/Login'
// import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

//const router = new Router({
export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/task/:id',
      props: true,
      name: 'task',
      component: Task
    },
    {
      path: '/list',
      name: 'list',
      component: tasksList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'authentication',
      component: Authentication
    },
    {
      path: '*',
      component: Home
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/registration',
    //   name: 'reg',
    //   component: Registration
    // }
  ],
  mode: 'history'
})
