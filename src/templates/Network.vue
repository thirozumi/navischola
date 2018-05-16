<template lang="pug">
  transition(name='n')
    .template-network
      section.section-heading-secondary
        .section-content
          h1
            img(src='/assets/images/title-schola-scope.svg', :alt='title')
      router-link.nav-left.button-primary.button-lg(v-bind:to="{ name : 'Home'}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ back }}
        i.icon-oval.icon-chevron-right
      ScholaScope
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
  },
  computed: {
    title() {
      return this.title_primary + ' | ' + this.title_secondary
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
.n-enter-active, .n-leave-active {
  transition: all .5s;
}
.n-enter, .n-leave-to {
  opacity: 0;
}
</style>
