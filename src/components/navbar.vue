
<template>
  <div class="container_navbar">
    <img src="../assets/iconHomeEmpty.svg" alt="iconUser" @click="goToHome()" />
    <img src="../assets/iconSearchEmpty.svg " alt="search" @click="goToSearch()" />
    <img src="../assets/iconAddEmpty.svg" alt="iconAddEmpty" @click="goToAdd()" />
    <img src="../assets/iconMsgEmpty.svg" alt="iconmsgEmpty" @click="goToMessage()" />
    <img src="../assets/iconUserEmpty.svg" alt="iconUserEmpty" @click="goToUser()" />
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
    }
  },
  methods: {
    goToHome() {
      this.$router.push("/home");
    },
    goToSearch() {
      this.$router.push("/search");
    },
    goToAdd() {
      this.$router.push("/add");
    },
    goToMessage() {
      this.$router.push("/message");
    },
    goToUser() {
      this.$router.push("/user");
    }
  }
}
</script>

<style scoped>

</style>
