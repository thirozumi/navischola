<template lang="pug">
  footer
    router-link(to="/about") {{ about }}
    p.copyright
      small(v-html='copyright')
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      'about': 'About Navischola',
      'copyright': 'Copyright &copy; Kyoto University. All Rights Reserved.'
    }
  },
}
</script>

<style style="scss">
  footer {}
</style>
