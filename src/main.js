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
//toutes les routes sont bloquer si il y a pas le un cookie token
const routes = [
    { path: '/', component: accueil },
    {path: '/home', component: home},
    {path: '/add', component: add},
    {path: '/connexion', component: formulaireConnexion},
    {path: '/inscription', component: formulaireConnexion},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
const pinia = createPinia()
app.use(router)

app.use(pinia)
app.mount('#app')
