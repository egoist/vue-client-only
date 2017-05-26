import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: resolve => require(['./Home.vue'], resolve)
      }
    ]
  })

export default { createRouter }
