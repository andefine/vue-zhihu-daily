import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'test',
    //   component: () => import('@/views/test')
    // },
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/HomePage'),
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () => import('@/views/NewsDetail'),
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/newsDetail/:id/comment',
      name: 'comment',
      component: () => import('@/views/Comment'),
      meta: {
        keepAlive: false
      }
    }
  ]
})
