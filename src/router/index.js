import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Home from "@/views/home.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      redirect: '/applicant',
      children:[
        {
          path:'/applicant',
          name:'Applicant',
          component:() => import('@/views/applicant'),
          meta:{
            requireAuth:true
          }
        },
        {
          path:'/user',
          name:'User',
          component:() => import('@/views/user'),
          meta:{
            requireAuth:true
          }
        }
      ]
    }
    ]
})

