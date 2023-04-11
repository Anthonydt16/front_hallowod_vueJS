<template>
  <div class="container_trainning">
    <div class="container_trainning_header">
      <span :class="{ active: isActiveWarmUp }" @click="click('WarmUp')">Warm up</span>
      <span :class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>
    </div>
    <DataChoose/>
    <div class="stopp" v-for="item in skills" v-if="isActiveSkills" :key="item">
      <CardTrainning :data="item" v-if="isActiveSkills" @delete="fetchTrainning(this.dateSelectStore.dateFormatted)"/>
    </div>
    <div class="stopp" v-for="item in warmUp"  v-if="isActiveWarmUp" :key="item">
      <CardTrainning :data="item"  v-if="isActiveWarmUp" @delete="fetchTrainning(this.dateSelectStore.dateFormatted)"/>
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
        const response = await axios.get(`http://localhost:3000/api/user/entrainement/${localStorage.getItem("idUser")}`, {
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
          console.log(data)
          const trainingData = data.find(element => {
            const dateFetch = new Date(element.date_entrainement);
            //sauf si les skills et warm up sont null
            return dateFetch.toLocaleDateString() === date && (element.skills.length !== 0  || element.warm_ups.length !== 0);
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

        this.$router.push("/connexion");

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
