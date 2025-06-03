import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import { createRouter, createWebHistory } from 'vue-router'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import ChargerList from './views/ChargerList.vue'


const routes = [
    {path: '/', redirect:'/signup'},
    {path:'/signup', component: SignUp},
    {path:'/login', component: Login},
    {path:'/chargers', component: ChargerList}
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
const app=createApp(App)
app.use(router)
app.mount('#app')
