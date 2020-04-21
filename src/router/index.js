import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import View from '../components/view.vue'
import Page from '../components/page.vue'
import Details from '../components/components/detailsDialog.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/index',
      component: Index
    },
    {
      path: '/view',
      component: View
    },
    {
      path: '/page',
      component: Page
    },
    {
      path: '/details',
      component: Details
    }

  ]
})