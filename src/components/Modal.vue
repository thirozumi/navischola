<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        header#modalTitle.modal-header
          slot(name='header')
            | {{ title_primary }}
            button.btn-close(type='button', @click='close', aria-label='Close modal')
              | x
        section#modalDescription.modal-body
          slot(name='body')
            | {{ lead }}
        footer.modal-footer
          slot(name='footer')
            p(v-html='button_lead')
            button
              | {{ button_text }}
</template>

<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      }
    },
    data () {
      return {
        title_primary: 'About Navischola',
        title_secondary: 'ナビスコラとは',
        lead: '京都大学・学際融合教育研究推進センターが、学術分野間の相互理解促進を目的とし実施している「学術分野の文化比較大調査」。各研究分野の価値観（研究感、世界観、評価基準など）、および行動特性（研究スタイル、研究コミュニティ活動など）をデータ化した日本初のデータベースが、着々と出来上がりつつあります。『ナビスコラ』では、2016年3月18日現在のデータを用い、誰でも簡単に「あなたのための学問」を診断できるようにしました。また、現状の学問分野の状況をヴィジュアライゼーションした「知の見取り図」も掲載。いまの学問を知るためのツールとしてご活用ください。',
        button_lead: '「学術分野の文化比較大調査」は絶賛データ募集中。<br>研究者の方は、是非アンケートにご協力ください。',
        button_text: 'アンケートに協力する'
      }
    }
  }
</script>

<style lang="scss">
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: all .1s linear;
  }
</style>
