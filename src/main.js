// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from "axios";
import Cookies from "js-cookie";

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:8088/api'

//钩子函数，访问路由前调用
router.beforeEach((to, from, next) => {
    //路由需要认证
    if (to.meta.requireAuth) {
      //判断cookie里是否有token
      if (Cookies.get("token")) {
        next()
      } else {
        next({
          path: 'login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
