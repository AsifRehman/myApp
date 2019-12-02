import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// accounts
import Partytypes from './views/accounts/partytypes/PartyTypes.vue'
import PartyCategs from './views/accounts/partycategs/PartyCategs.vue'
import MHead from './views/accounts/MHead/mhead.vue'
import Head from './views/accounts/Head/Head.vue'

import CashReceipt from './views/transactions/CashReceipt/cr.vue'
import CashPayment from './views/transactions/CashPayment/cp.vue'
import GeneralJounral from './views/transactions/JV/jv.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/partytypes', name: 'partytypes', component: Partytypes},
    { path: '/partycategs', name: 'partycategs', component: PartyCategs},
    { path: '/mhead', name: 'mhead', component: MHead},
    { path: '/head', name: 'head', component: Head},

    { path: '/cr', name: 'cr', component: CashReceipt},
    { path: '/cp', name: 'cp', component: CashPayment},
    { path: '/jv', name: 'jv', component: GeneralJounral},

    { path: '/about', name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About/About.vue')
    }
  ]
})
