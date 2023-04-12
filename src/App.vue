<script setup>

import Header from "@/components/header.vue";
import Navbar from "@/components/navbar.vue";
import PopUp from "@/components/popUp.vue";

</script>

<template>
  <Header></Header>
  <main>
    <router-view/>
  </main>
  <navbar/>
</template>

<style scoped>
main{
  height: 84vh;
}
</style>
