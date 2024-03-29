import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Location from './components/PathConsole.vue'
import MasterPathConsole from './components/MasterPathConsole.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/063d01cd',
      component: MasterPathConsole,
      name: 'MasterPathConsole',
      props: true 
    },
    {
      path: '/locn/:locnid',
      component: Location,
      name: 'PathConsole',
      props: true 
    },
    {
      path: '/CaseInquiry',
      component: () => import(/* webpackChunkName: "about" */ './views/CaseInquiry.vue'),
      name: 'CaseInquiry',
      props: true 
    }
      
  ]
})
