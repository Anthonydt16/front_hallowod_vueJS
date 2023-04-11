import { createApp } from 'vue'
import App from './App.vue'
//insert le style
import './style/index.scss'
import { createPinia } from 'pinia'
//faire le router ici
import { createRouter, createWebHistory } from 'vue-router'
import accueil from "@/pages/accueil.vue";
import formulaireConnexion from "@/components/FormulaireConnexion.vue";
import home from "@/pages/home.vue";
import add from "@/pages/add.vue";
import AddSeance from "@/components/AddSeance.vue";
import inscription from "@/pages/inscription.vue";
import error from "@/pages/404.vue";

//toutes les routes sont bloquer si il y a pas le un cookie token
const routes = [
    { path: '/', component: accueil },
    {path: '/home', component: home},
    {path: '/add', component: add},
    {path: '/connexion', component: formulaireConnexion},
    {path: '/addSeance', component: AddSeance},
    {path: '/search', component: home},
    {path: '/message', component: home},
    {path: '/user', component: home},
    {path: '/inscription', component: inscription},
    {path: '/404', component: error},
]

//route par defaut
routes.push({ path: '/:pathMatch(.*)*', redirect: '/404' })

//route si il y a pas de cookie token redirige vers la page de connexion
if (document.cookie.indexOf('token') === -1) {
    routes.push({ path: '/:pathMatch(.*)*', redirect: '/' })
}



const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
const pinia = createPinia()
app.use(router)

app.use(pinia)
app.mount('#app')
