<template>
  <header>
    <img src="../assets/logo.svg" alt="logo" @click="this.redirect()"/>
  </header>
</template>

<script>
export default {
  name: "header",
  methods: {
    redirect() {
      this.$router.push("/home");
    }
  }
}
</script>

<style scoped>

</style>
