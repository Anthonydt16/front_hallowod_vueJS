<template>
   <div class="page-404">
      <h1>404</h1>
      <h2>Page not found</h2>
     <router-link to="/home">Go to home</router-link>
    </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-image: url("../assets/background_img.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>