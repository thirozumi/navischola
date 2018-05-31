<template lang="pug">
  footer(role='content-info')
    router-link.brand-sm(to="/")
      img(src='/assets/images/logo-navischola.svg')
    a.about(href='#', @click='showAbout', onclick="return false")
      | {{ about }}
    About(v-show='isAboutVisible', @close='closeAbout')
    .copyright
      small(v-html='copyright')
</template>

<script>
import About from './About.vue'

export default {
  name: 'Footer',
  components: {
    About
  },
  data() {
    return {
      isAboutVisible: false,
      'about': 'About NaviSchola',
      'copyright': 'Copyright &copy; Kyoto University. All Rights Reserved.'
    }
  },
  methods: {
    showAbout() {
      this.isAboutVisible = true;
    },
    closeAbout() {
      this.isAboutVisible = false;
    }
  }
}
</script>

<style style="scss">
</style>
