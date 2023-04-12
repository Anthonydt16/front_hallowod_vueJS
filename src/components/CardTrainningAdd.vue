<template >
  <div class="erreur" v-if="popup">
    <p>{{this.erreur}}</p>
  </div>
  <div class="valide" v-if="popupV">
    <p>{{this.message}}</p>
  </div>
  <div v-for="item in ContainerAdd" :key="item">
    <div v-html="item"></div>
  </div>
  <div class="container_card_Trainning_Add"  @click="add()">
    <img src="../assets/iconAddEmpty.svg" class="warmupImg" alt="warmup" >
  </div>
  <button class="button" @click="registerValue()">Enregistrer</button>
</template>

<script>
import axios from "axios";
import { useDateSelectStore } from "@/stores/dateSelect";

export default {
  name: "CardTrainningAdd",
  props: {
    typeTrainning: String,
    required: true
  },
  methods: {
    add() {
      console.log("add")
      this.ContainerAdd.push(
          '  <div class="container_card_Trainning_Add">\n'+
          '    <h2 contenteditable="true" class="title_entrer_data">Entrer un titre</h2>'+
          '    <p class="entrer_data" contenteditable="true"> Entrer les exercice</p>\n' +
          '  </div>'
      )
      console.log(this.ContainerAdd)
    },
    //quand un element et editable on enregistre la valeur dans une variable
    registerValue() {
      let data = document.getElementsByClassName("entrer_data");
      let title = document.getElementsByClassName("title_entrer_data");
      let dataValue = [];
      let donnee = [];
      donnee['skills'] = [];
      donnee['warmup'] = [];
      for (let i = 0; i < data.length; i++) {
        dataValue = {
          title: title[i].innerText,
          data: data[i].innerText
        }
        donnee[this.typeTrainning].push(dataValue)
      }
      this.sendData(donnee['warmup'], donnee['skills']);
    },
    sendData(warm_ups, skills) {
      axios.post(`http://localhost:3000/api/entrainement/`, {
        date_entrainement: this.storeDateSelected.dateFormatted,
        warm_ups: warm_ups,
        skills: skills,
        idUser: localStorage.getItem("idUser")
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": localStorage.getItem("token")
        }
      }).then((response) => {
        if (response.status === 200) {
          this.popupV = true;
          this.message = "Séance enregistrée";
          setTimeout(() => {
            this.popupV = false;
          }, 2000);
        }
      }).catch((error) => {
        this.popup = true;
        this.erreur = error;
        setTimeout(() => {
          this.popup = false;
        }, 2000);
      });
    },

    refreshData() {
      this.ContainerAdd = [];
    }
  },
  data: () => ({
    ContainerAdd: [],
    storeDateSelected : useDateSelectStore(),
    erreur: "Voici l'erreur",
    popup : false,
    message: "Séance enregistrée",
    popupV : false
  }),
  beforeMount() {
    this.storeDateSelected.$subscribe((mutation, state) => {
      this.refreshData();
    });
  },
};
</script>

<style scoped>

</style>
