<template>
  <div class="container_cardTrainning">
    <h2>{{ title }}</h2>
    <div class="container_cardTrainning_style">
      <div class="container_trainning_trainning">
        <div class="container_trainning" v-for="item in contenu" :key="item">
          <p>{{(item == null)? "Vide":item}}</p>
        </div>
      </div>
      <img src="../assets/warmup.jpg" class="warmupImg" alt="warmup">
    </div>
  </div>
</template>

<script>
import { useDateSelectStore } from "@/stores/dateSelect";
export default {
  name: "cardTrainning",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: "",
    contenu: [],
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
    updateData() {
      if (!this.data || this.data.length === 0) {
        this.contenu = [];
        this.title = "Vide aujourd'hui";
        return;
      }
      const exercices = this.data.exercices;
      this.title = exercices.nom;
      this.contenu = exercices.contenu.split(",");
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
