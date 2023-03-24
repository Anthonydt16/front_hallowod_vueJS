<template>
  <div class="container_trainning">
    <div class="container_trainning_header">
      <span :class="{ active: isActiveWarmUp }" @click="click('WarmUp')">Warm up</span>
      <span :class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>
    </div>
    <DataChoose/>
    <div class="stopp">
      <CardTrainning :data="skills" v-if="isActiveSkills" />
      <CardTrainning :data="warmUp" v-if="isActiveWarmUp" />
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
      warmUp: null
    }
  },
  methods: {
    click(item) {
      this.isActiveWarmUp = item === "WarmUp";
      this.isActiveSkills = item === "Skills";
    },

    async fetchTrainning(date) {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/entrainement/${localStorage.getItem("idUser")}`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": localStorage.getItem("token")
          }
        });
        const data = response.data;
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
      } catch (error) {
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
