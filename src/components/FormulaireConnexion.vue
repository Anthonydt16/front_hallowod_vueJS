<template>
  <div class="container_formulaireConnexion">
    <h1>Formulaire de connexion</h1>
    <div class="erreur" v-if="popup">
      <p>{{this.erreur}}</p>
    </div>
    <div class="container_input">
      <input v-model="name" type="text" class="input" placeholder="Nom d'utilisateur">
      <input v-model="password" type="password" class="input" placeholder="mot de passe">
    </div>
    <div  class="container_checkbox">
      <div class ="container_checkbox_div">
        <input type="checkbox" class="input" name="connectReste">
        <label for="connectReste">Restez connecter</label>
      </div>
      <a href="#">Mot de passe oublié</a>
    </div>
    <div class="inscription">
      <span>Vous n'avez pas de compte ?</span>
      <a href="/inscription">Créer un compte</a>
    </div>
    <button @click="connect()" class="button">Connexion</button>
  </div>
</template>

<script>
import {createRouter as router} from "vue-router";
import axios from "axios";
import spinner from "../assets/spinner.svg";

export default {
  name: "FormulaireConnexion",
  data() {
    return {
      name: "",
      password: "",
      erreur: "Voici l'erreur",
      popup : false
    }
  },
  methods: {
    async connect() {
      //si les inputs sont vide alors on affiche un message d'erreur
      if (this.name === "" || this.password === "") {
        alert("Veuillez remplir les champs");
      } else if (this.name === null || this.password === null) {
        alert("Veuillez remplir les champs");
      } else {
        //Taper l'api pour se connecter avec axios
        let config = {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
          }
        }
        //le temps de la requete on affiche un message d'attente

        let data = await axios.post("http://localhost:3000/api/user/login", {
          identifiant: this.name,
          password: this.password
        }, config).catch((err) => {
          this.popup = true;
          this.erreur = err;
        });


        let json = await data.data;
        //save le token dans le local storage
        if (json.token === undefined) {
          this.popup = true;
          this.erreur = json.message;
          return;
        }
        if (json.id === null) {
          this.popup = true;
          this.erreur = json.message;
          return;
        }
        localStorage.setItem("token", json.token);
        localStorage.setItem("idUser", json.id);

        //rediriger vers la page d'accueil
        this.$router.push("/home");

      }
    }
  }
}
</script>

<style scoped>

</style>
