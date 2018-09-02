// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import { Toast } from 'mint-ui' // 就使用这一个组件
import 'normalize.css' // A modern alternative to CSS resets
import 'lib-flexible' // 引入淘宝手机端适配方案，当然还要使用px2rem-loader
import '@/styles/common.scss' // 全局公共样式

Vue.config.productionTip = false

Vue.prototype.$toast = Toast

Vue.use(VueLazyload)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
