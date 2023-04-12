<link rel="stylesheet" href="../style/setting.scss">
<template>
  <div class="popUp" :style="{backgroundColor: color}">
    <h3>{{this.title}}</h3>
    <p>
      {{this.contenu}}
    </p>
  </div>
</template>

<script>
export default {
  name: "popUp",
  props: {
    title: {
      type: String,
      required: true
    },
    contenu: {
      type: String,
      required: true
    },
    color:{
      type: String,
      required: true
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
