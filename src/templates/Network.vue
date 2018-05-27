<template lang="pug">
  transition(name='n')
    .template-network
      section.section-heading-secondary
        .section-content
          h1
            img(src='/assets/images/title-schola-scope.svg', :alt='title_alt')
      router-link.nav-left.button-primary.button-lg.back-default(v-if="$route.params.id", v-bind:to="{ name : 'Result', 'params': { id: $route.params.id, s: $route.params.s }}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ back }}
      router-link.nav-left.button-primary.button-lg.back-default(v-else, v-bind:to="{ name : 'Home'}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ back }}
      router-link.nav-left.back-small(v-if="$route.params.id", v-bind:to="{ name : 'Result', 'params': { id: $route.params.id, s: $route.params.s }}")
        i.icon-oval-inverted.icon-oval-lg.icon-chevron-left
      router-link.nav-left.back-small(v-else, v-bind:to="{ name : 'Home'}")
        i.icon-oval-inverted.icon-oval-lg.icon-chevron-left
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
  name: 'Network',
  components: {
    Footer, ScholaScope, Help
  },
  data() {
    return {
      title: '分野相関図：Schola Scope｜ナビスコラ：学問分野診断＆相関図',
      description: 'あなたにぴったりな学問を見つけよう！',
      path: '/network',
      image: '/assets/images/og.png',
      isHelpVisible: false,
      title_primary: 'Schola Scope',
      title_secondary: '学問分野相関図',
      back: 'もどる'
    }
  },
  created: function() {
    this.setMeta()
  },
  computed: {
    title_alt() {
      return this.title_primary + ' | ' + this.title_secondary
    }
  },
  methods: {
    setMeta: function() {
      document.title = this.title;
      document.querySelector('meta[property="og:title"]').setAttribute('content', this.title);
  		document.querySelector('meta[property="description"]').setAttribute('content', this.description);
      document.querySelector('meta[property="og:description"]').setAttribute('content', this.description); document.querySelector('meta[property="og:image"]').setAttribute('content', this.$host + this.image);
      document.querySelector('meta[property="og:url"]').setAttribute('content', this.$host + this.path);
    },
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
