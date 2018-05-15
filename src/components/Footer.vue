<template lang="pug">
  footer(role='content-info')
    router-link.brand-sm(to="/")
      img(src='/assets/images/logo-navischola.svg')
    a.about(href='#', @click='showModal', onclick="return false")
      | {{ about }}
    Modal(v-show='isModalVisible', @close='closeModal')
    .copyright
      small(v-html='copyright')
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'Footer',
  components: {
    Modal
  },
  data() {
    return {
      isModalVisible: false,
      'about': 'About Navischola',
      'copyright': 'Copyright &copy; Kyoto University. All Rights Reserved.'
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>

<style style="scss">
</style>
