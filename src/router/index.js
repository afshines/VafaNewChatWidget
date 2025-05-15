import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  

]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
