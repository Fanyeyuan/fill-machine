import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ready',
    name: 'Ready',
    component: () => import('../views/Ready.vue')
  },
  {
    path: '/qrcode',
    name: 'QRcode',
    component: () => import('../views/QRcode.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import('../views/Log.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const store = router.app.$store
  if (to.path !== '/login' && process.env.NODE_ENV === 'production') {
    if (!store || !store.state.user.username) {
      // console.log(store.state, !store.state.user.username)
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
