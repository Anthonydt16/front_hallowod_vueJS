<template>
  <div class="accueil">
    <div class="frist_container">
      <h2>AVEC <span>HALLOWOD</span>
        BOOSTEZ VOS
        PERF’ ET PARTAGEZ-LES
        AVEC LE MONDE <span class="lien">Inscrit-toi!</span></h2>
    </div>
<!--    <div class="second_container">-->
<!--      <h1>HALLOWOD</h1>-->
<!--      <h3>Vidéo promotionnelle</h3>-->
<!--      <video controls>-->
<!--        <source src="../assets/teaser_finit.mp4" type="video/mp4">-->
<!--      </video>-->
<!--    </div>-->

<!--      <h1>Accueil</h1>-->
<!--    <video controls>-->
<!--      <source src="../assets/teaser_finit.mp4" type="video/mp4">-->
<!--    </video>-->
  </div>
</template>

<script>
import FormulaireConnexion from "@/components/FormulaireConnexion.vue";
import PopUp from "@/components/popUp.vue";
import img from "../assets/phone_landingPage.png";
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
