<template>
  <div class="container_home">
    <Trainning />
  </div>

</template>


<script>
import Navbar from "@/components/navbar.vue";
import DataChoose from "@/components/dataChoose.vue";
import Trainning from "@/components/Trainning.vue";

export default {
  name: "home",
  components: {DataChoose, Navbar, Trainning},
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
