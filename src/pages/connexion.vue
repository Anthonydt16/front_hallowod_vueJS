<template>
  <div>
    <h1>Connexion</h1>
    <FormulaireConnexion/>
  </div>
</template>

<script>
import FormulaireConnexion from "@/components/FormulaireConnexion.vue";
import PopUp from "@/components/popUp.vue";

export default {
  name: "connexion",
  components: {PopUp, FormulaireConnexion},

}
</script>

<style scoped>

</style>
