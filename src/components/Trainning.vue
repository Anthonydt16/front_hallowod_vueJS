<template>
  <div class="container_trainning">
    <div class="container_trainning_header">
      <span  v-bind:class="{ active: isActiveWarmUp }" @click="click('WarmUp')" >Warm up</span>
      <span v-bind:class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>
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
import dataJson from "../assets/data.json";
import axios from "axios";
export default {
  name: "Trainning",
  components: {DataChoose, CardTrainning},
  data() {
    return {
      isActiveWarmUp: true,
      isActiveSkills: false,
      dateSelectStore:useDateSelectStore(),
      dataJson: dataJson,
      skills: null,
      warmUp: null
    }
  },
  methods: {
    click: function (item) {
      if (item == 'WarmUp') {
        this.isActiveWarmUp = true;
        this.isActiveSkills = false;
      } else {
        this.isActiveWarmUp = false;
        this.isActiveSkills = true;
      }
    },
    Print: function (date) {
      //affiche la data qui à en clé la même date
      console.log(this.dataJson[date]);
      if (this.dataJson[date] == undefined) {
        this.skills = null;
        this.warmUp = null;
        return;
      }
      this.skills = this.dataJson[date].skills;
      this.warmUp = this.dataJson[date].warm_up;
    },

    async fetchTrainning(date) {
      let data = await axios.get("http://localhost:4000/api/user/entrainement/" + localStorage.getItem("idUser"),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token" : localStorage.getItem("token")
          }
        }).then((response) => {
        console.log(response.data)
        this.skills = response.data.skills;
        this.warmUp = response.data.warm_up;
      });

    }
  },
  watch: {
    skills: function (val) {
      console.log(val);
    },
    warmUp: function (val) {
      console.log(val);
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
