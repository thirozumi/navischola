<template lang="pug">
  div
    button.btn(type='button', @click='showModal')
      | {{ about }}
    Modal(v-show='isModalVisible', @close='closeModal')
    footer
      p.copyright
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
