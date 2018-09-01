import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'test',
    //   component: () => import('@/views/test')
    // },
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/HomePage')
    },
    {
      path: '/themePage/:id',
      name: 'themePage',
      component: () => import('@/views/ThemePage')
    },
    {
      path: '/newsDetail/:id',
      name: 'newsDetail',
      component: () => import('@/views/NewsDetail')
    },
    {
      path: '/newsDetail/:id/comment',
      name: 'comment',
      component: () => import('@/views/Comment')
    }
  ]
})
