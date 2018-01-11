import Vue from 'vue'
import Router from 'vue-router'

import customerAddress from '@/pages/customerAddress.vue'





Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'customerAddress',
      component: customerAddress
    }
  ]
})
