<template>
  <div class="container_trainning">
    <div class="container_trainning_header">
      <span :class="{ active: isActiveWarmUp }" @click="click('WarmUp')">Warm up</span>
      <span :class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>
    </div>
    <DataChoose/>
    <div class="stopp" v-for="item in skills" v-if="isActiveSkills" :key="item">
      <CardTrainning :data="item" v-if="isActiveSkills" />
    </div>
    <div class="stopp" v-for="item in warmUp"  v-if="isActiveWarmUp" :key="item">
      <CardTrainning :data="item"  v-if="isActiveWarmUp" />
    </div>
  </div>
</template>

<script>
import CardTrainning from "@/components/cardTrainning.vue";
import DataChoose from "@/components/dataChoose.vue";
import { useDateSelectStore } from "@/stores/dateSelect";
import axios from "axios";

export default {
  name: "Trainning",
  components: {DataChoose, CardTrainning},
  data() {
    return {
      isActiveWarmUp: true,
      isActiveSkills: false,
      dateSelectStore: useDateSelectStore(),
      skills: null,
      warmUp: null,
      idTraining: null
    }
  },
  methods: {
    click(item) {
      this.isActiveWarmUp = item === "WarmUp";
      this.isActiveSkills = item === "Skills";
    },

    async fetchTrainning(date) {
      try {
        console.log(localStorage.getItem("token"))
        const response = await axios.get(`http://localhost:4000/api/user/entrainement/${localStorage.getItem("idUser")}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": localStorage.getItem("token")
          }
        });
        const data = response.data;
        console.log(data)
        if (data === "No data found") {
          this.skills = null;
          this.warmUp = null;
        }else{
          //si le code erreur et 401 alors on redirige vers la page de connexion
          const trainingData = data.find(element => {
            const dateFetch = new Date(element.date_entrainement);
            return date === dateFetch.toLocaleDateString();
          });
          if (trainingData) {
            this.skills = trainingData.skills;
            this.warmUp = trainingData.warm_ups;
          } else {
            this.skills = null;
            this.warmUp = null;
          }
        }

      } catch (error) {
        //si l'erreur et un 401 alors on redirige vers la page de connexion
        console.log(error)
        if (error.response.status === 401) {
          this.$router.push("/connexion");
        }
        console.log(error);
      }
    }
  },
  mounted() {
    this.fetchTrainning(this.dateSelectStore.dateFormatted);
  },
  beforeMount() {
    this.dateSelectStore.$subscribe((mutation, state) => {
      this.fetchTrainning(this.dateSelectStore.dateFormatted);
    });
  }
}
</script>

<style scoped>

</style>
