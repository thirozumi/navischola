<template lang="pug">
  div
    Header
    h1 {{ title }}
    h2 {{ heading }}
    p(v-if="map !== null")
      img(v-bind:src="map")
    Footer
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Result',
  components: {
    Header, Footer
  },
  data() {
    return {
      'title': 'RESULT | 診断結果'
    }
  },
  computed: {
    heading: function() {
      const q = this.$route.query.q;
      if (q === 'foo') {
        return 'あなたは foo を学ぶべき'
      } else if (q === 'bar') {
        return 'あなたは bar を学ぶべき'
      } else if (q === 'baz') {
        return 'あなたは baz を学ぶべき'
      } else {
        return 'Error!'
      }
    },
    map: function() {
      const q = this.$route.query.q;
      if (q === 'foo') {
        return 'https://source.unsplash.com/1024x768/?trip'
      } else if (q === 'bar') {
        return 'https://source.unsplash.com/1024x768/?child'
      } else if (q === 'baz') {
        return 'https://source.unsplash.com/1024x768/?food'
      }
    }
  }
}
</script>

<style lang="scss">
</style>
