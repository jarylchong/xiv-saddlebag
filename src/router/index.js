import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EurekaWeather from '../views/EurekaWeather'
import PfBuilder from '../views/PfBuilder'
import WeekliesTracker from '../views/WeekliesTracker'
import DevLogs from '../views/DevLogs'

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
  },
  {
    path: '/weeklies-tracker',
    name: 'Weeklies Tracker',
    component: WeekliesTracker
  },
  {
    path: '/dev-logs',
    name: 'Dev Logs',
    component: DevLogs
  }
]

const router = new VueRouter({
  routes
})

export default router
