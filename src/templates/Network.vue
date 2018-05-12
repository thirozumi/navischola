<template lang="pug">
  div
    h1
      small {{ title_secondary }}
      | {{ title_primary }}
    ScholaScope
    p
      router-link(v-bind:to="{ name : 'Home'}", tag='button') {{ back }}
    Footer
</template>

<script>
import ScholaScope from '../components/ScholaScope.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer, ScholaScope
  },
  data() {
    return {
      title_primary: 'Schola Scope',
      title_secondary: '学問分野相関図',
      back: 'もどる'
    }
  }
}
</script>

<style lang="scss">
  h1 > small {
    display: block;
  }
</style>
