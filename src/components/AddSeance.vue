<template>
  <div class="container_add_seance">
    <div class="container_trainning_header">
      <span :class="{ active: isActiveWarmUp }" @click="click('WarmUp')">Warm up</span>
      <span :class="{ active: isActiveSkills }" @click="click('Skills')">Skills</span>
      <DataChoose/>
    </div>
    <div class="card_trainning_add">
      <CardTrainningAdd/>
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
    }
  },
}
</script>

<style scoped>

</style>
