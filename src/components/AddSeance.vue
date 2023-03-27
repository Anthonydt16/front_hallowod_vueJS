<template>
  <div class="container_add_seance">
    <div class="container_trainning_header">
      <span :class="{ active: isActiveWarmUp }" @click="click('WarmUp')">Warm up</span>
      <span :class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>

    </div>
    <DataChoose/>
    <div class="card_trainning_add">
      <CardTrainningAdd :typeTrainning="warmup" v-if="isActiveWarmUp"/>
      <CardTrainningAdd :typeTrainning="skills" v-if="isActiveSkills"/>
    </div>
  </div>
</template>

<script>
import DataChoose from "@/components/dataChoose.vue";
import CardTrainningAdd from "@/components/CardTrainningAdd.vue";
export default {
  name: "AddSeance",
  components: {CardTrainningAdd, DataChoose},
  data() {
    return {
      isActiveWarmUp: true,
      isActiveSkills: false,
      warmup: "warmup",
      skills: "skills"
    }
  },
  methods: {
    click(item) {
      this.isActiveWarmUp = item === "WarmUp";
      this.isActiveSkills = item === "Skills";
    },

  }
}
</script>

<style scoped>

</style>
