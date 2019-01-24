import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: () => import('@/view/test')
    }
    // {
    //   path: '/',
    //   name: 'testLOL',
    //   component: () => import('@/view/ViewTemplate')
    // }
  ]
})
