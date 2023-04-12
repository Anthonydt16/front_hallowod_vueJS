<template>
  <div>
      <h1>Accueil</h1>
  </div>
</template>

<script>
import FormulaireConnexion from "@/components/FormulaireConnexion.vue";
import PopUp from "@/components/popUp.vue";
import img from "../assets/logo.svg";
export default {
  name: "accueil",
  components: {PopUp, FormulaireConnexion},
  data() {
    return {
      img: img
    }
  }
}
</script>

<style scoped>

</style>
