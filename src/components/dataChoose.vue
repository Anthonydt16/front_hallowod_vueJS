
<template>
  <div class="container_dateSelect">
    <img src="../assets/chevron.svg" alt="" class="chevron" @click="previous()">
    <div class="container_dateSelect_div">
      {{dateString}}
    </div>
    <img src="../assets/chevron.svg" alt="" class="chevron droite" @click="next()">
  </div>
</template>

<script>
import { useDateSelectStore } from "@/stores/dateSelect";

export default {
  name: "dataChoose",
  data() {
    return {
      dateSelectStore:useDateSelectStore(),
      isActive: true,
      dateSelect: new Date()
    }
  },
  computed: {
    dateString() {
      return this.dateSelect.toLocaleDateString();
    }
  },
  methods: {
    next() {
      //dateSelect change elle prend plus 1 jours
      this.dateSelect.setDate(this.dateSelect.getDate() + 1);
      this.dateSelect = new Date(this.dateSelect);
      this.dateSelectStore.setDate(this.dateSelect);
    },
    previous() {
      //dateSelect change elle prend moins 1 jours
      this.dateSelect.setDate(this.dateSelect.getDate() - 1);
      this.dateSelect = new Date(this.dateSelect);
      this.dateSelectStore.setDate(this.dateSelect);
    }
  },
  mounted() {


  },

}

</script>

<style scoped>

</style>
