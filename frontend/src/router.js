import { createRouter, createWebHistory } from "vue-router";
import ChargerList from './views/ChargerList.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'

const routes=[
  {path: '/', redirect:'/signup'},
  { path: '/chargers', component: ChargerList },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp }
  

]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router