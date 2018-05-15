<template lang="pug">
  div
    Header
    h2 {{ title }}
    Footer
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'NotFound',
  components: {
    Header, Footer
  },
  data () {
    return {
      title: 'Not Found'
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/styles/main.scss";
</style>
