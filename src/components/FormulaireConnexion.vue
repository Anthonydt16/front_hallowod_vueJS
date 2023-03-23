<template>
  <div class="container_formulaireConnexion">
    <h1>Formulaire de connexion</h1>
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
    <button @click="connect()" class="button">Connexion</button>
  </div>
</template>

<script>
import {createRouter as router} from "vue-router";
import axios from "axios";

export default {
  name: "FormulaireConnexion",
  data() {
    return {
      name: "",
      password: ""
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
        let data = await axios.post("http://localhost:4000/api/user/login", {
          identifiant: this.name,
          password: this.password
        }, config);
        let json = await data.data;
        //save le token dans le local storage
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
