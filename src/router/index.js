import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EurekaWeather from '../views/EurekaWeather'
import PfBuilder from '../views/PfBuilder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/eureka-weather',
    name: 'Eureka Weather alarm',
    component: EurekaWeather
  },
  {
    path: '/pf-builder',
    name: 'PF Builder',
    component: PfBuilder
  }
]

const router = new VueRouter({
  routes
})

export default router
