<script setup>

import Header from "@/components/header.vue";
import Navbar from "@/components/navbar.vue";
</script>

<template>
  <Header></Header>
  <main>
    <router-view></router-view>
  </main>
  <navbar/>
</template>

<style scoped>
main{
  height: 84vh;
}
</style>
