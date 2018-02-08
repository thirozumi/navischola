<template lang="pug">
  div
    h1 {{ title }}
    h2 {{ subtitle }}
    p {{ lead }}
    p
      small ※ {{ note }}
    p
      router-link(v-bind:to="{ name : 'Question', params : { id: 1 }}", tag='button') 診断はこちらから
    Footer
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      title: 'ナビスコラ',
      subtitle: 'あなたにぴったりの学問',
      lead: 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>

<style lang="scss">
</style>
