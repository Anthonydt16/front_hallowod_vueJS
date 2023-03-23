<link rel="stylesheet" href="../style/setting.scss">
<template>
<div class="container_cardTrainning">
  <h2>{{ title }}</h2>
  <div class="container_cardTrainning_style">
    <div class="container_trainning_trainning">
      <div class="container_trainning" v-for="item in data">
        <p>{{item}}</p>
      </div>
    </div>
    <img src="../assets/warmup.jpg" class="warmupImg" alt="warmup">
  </div>

</div>
</template>

<script>
export default {
  name: "cardTrainning",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: ""
    }
  },
  mounted() {
    if (this.data === null) {
      return;
    }
    if (this.title === "") {
      this.title = this.data[0];
      this.data.shift();
    }
  }
}
</script>

<style scoped>

</style>
