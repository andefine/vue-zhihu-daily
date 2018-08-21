import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/HomePage')
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () => import('@/views/NewsDetail')
    }
  ]
})
