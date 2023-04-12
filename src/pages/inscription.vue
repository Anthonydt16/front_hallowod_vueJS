<link rel="stylesheet" href="../style/page/add.scss">
<template>
  <div class="container_formulaireInscription">
    <h1>Formulaire inscription</h1>
    <div class="erreur" v-if="popup">
      <p>{{this.erreur}}</p>
    </div>
    <div class="valide" v-if="popupV">
      <p>{{this.message}}</p>
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
    </div>
    <button @click="connect()" class="button">Inscription</button>
  </div>
</template>

<script>
import {createRouter as router} from "vue-router";
import axios from "axios";

export default {
  name: "inscription",
  data() {
    return {
      name: "",
      password: "",
      erreur: "Voici l'erreur",
      popup : false,
      popupV: false,
      message: "Voici le message"
    }
  },
  methods: {
    async connect() {
      this.popup = false;
      this.popupV = false;

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
        let data = await axios.post("http://localhost:3000/api/user/register", {
          identifiant: this.name,
          password: this.password
        }, config).catch((err) => {
          this.popup = true;
          this.erreur = "Erreur d'inscription";
        });
        let json = await data.data;
        this.popupV = true;
        this.message = "compte créer avec succès";
        //save le token dans le local storage
        localStorage.setItem("token", json.token);
        localStorage.setItem("idUser", json.id);
        this.$router.push("/connexion");

      }
    }
  }
}
</script>

<style scoped>

</style>
