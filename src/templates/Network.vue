<template lang="pug">
  transition(name='n')
    .template-network
      section.section-heading-secondary
        .section-content
          h1
            img(src='/assets/images/title-schola-scope.svg', :alt='title')
      router-link.nav-left.button-primary.button-lg(v-if="$route.query.id", v-bind:to="{ path : 'result', 'query': { id: $route.query.id, s: $route.query.s }}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ back }}
      router-link.nav-left.button-primary.button-lg(v-else, v-bind:to="{ name : 'Home'}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ back }}
      .section-footer
        .list-horizontal
          li
            a.plus.zoomButton#zoomIn(href="#", onclick="return false")
              i.icon-oval-inverted-lg.icon-plus
          li
            a.minus.zoomButton#zoomOut(href="#", onclick="return false")
              i.icon-oval-inverted-lg.icon-minus
          li
            a.help(href='#', @click='showHelp', onclick="return false")
              i.icon-oval-inverted-lg.icon-help
      Help(v-show='isHelpVisible', @close='closeHelp')
      ScholaScope
      Footer
</template>

<script>
import Help from '../components/Help.vue'
import ScholaScope from '../components/ScholaScope.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer, ScholaScope, Help
  },
  data() {
    return {
      isHelpVisible: false,
      title_primary: 'Schola Scope',
      title_secondary: '学問分野相関図',
      back: 'もどる'
    }
  },
  computed: {
    title() {
      return this.title_primary + ' | ' + this.title_secondary
    }
  },
  methods: {
    showHelp() {
      this.isHelpVisible = true;
    },
    closeHelp() {
      this.isHelpVisible = false;
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
  transform: translate(10vw, 0);
}
</style>
