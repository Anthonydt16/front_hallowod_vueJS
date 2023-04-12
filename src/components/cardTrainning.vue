<template>
  <div class="container_cardTrainning">
    <div class="title">
      <h2>{{ title }} </h2>
      <img src="@/assets/poubelle.svg" alt="poubelle" @click="this.delete()" />
    </div>
    <div class="container_cardTrainning_style">
      <div class="container_trainning_trainning">
        <p class="container_trainning" v-for="item in contenu" :key="item">
          {{(item == null)? "Vide":item}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useDateSelectStore } from "@/stores/dateSelect";
import axios from "axios";
export default {
  name: "cardTrainning",
  props: {
    data: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    title: "",
    contenu: [],
    id: 0,
    dateSelectStore:useDateSelectStore(),
  }),
  mounted() {
    this.updateData();
  },
  watch: {
    data: function (newVal, oldVal) {
      this.updateData();
    }
  },
  methods: {

    async delete() {
      let data = await axios.delete(`http://localhost:3000/api/exercice/${this.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": localStorage.getItem("token")
        }
      });
      if (data.status === 201) {
        //l'element a bien été supprimé donc on cache le composant
        this.$emit("delete");
      }
    },
    updateData() {
      if (!this.data || this.data.length === 0) {
        this.contenu = [];
        this.title = "Vide aujourd'hui";
        return;
      }
      const exercices = this.data.exercices;
      this.title = exercices.nom;
      this.id = exercices.id;
      this.contenu = exercices.contenu.split(",");
      if (this.contenu[0].includes("\n")) {
        this.contenu = this.contenu[0].split("\n");
      }


    }
  },
  beforeMount() {
    this.dateSelectStore.$subscribe((mutation, state) => {
      this.updateData();
    });
  }
};
</script>

<style scoped>
</style>
