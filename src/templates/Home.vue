<template lang="pug">
  .components
    span.brand
      img(src='/assets/images/logo-navischola.svg')
    router-link(v-bind:to="{ name : 'Question', params : { id: 1 }}", tag='button') {{ start }}
    router-link(v-bind:to="{ name : 'Network'}", tag='button') {{ network }}
    section.section-primary
      h1
        img(src='/assets/images/logo-navischola-full.svg', :alt='title_primary + " | " + title_secondary + " - " + subtitle')
      p {{ lead }}
      p
        small {{ note }}
    section.section-secondary
      img(src='/assets/images/lenna.png')
    section.section-thirtiary
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
      title_primary: 'NaviSchola',
      title_secondary: 'ナビスコラ',
      subtitle: 'あなたにぴったりの学問',
      lead: '大学で研究される学問領域は細分化が進み、いまや学会の数はなんと2,022もあるのだとか。このなかから、本当に「自分らしい学問」を選ぶのは至難のわざかもしれません。京都大学 学際融合教育研究推進センターは1,757人の研究者からのデータを元に、あなたにふさわしい学問分野を教えてくれる診断ツール「Your Schola」と、膨大な学問分野の関係性を解き明かす分野相関「Schola Scope」を開発しました。いま研究者の方も、これから研究者を目指す方も、まずは一度、自分とその学問との「相関」を見てみよう！',
      note: '本診断は京都大学 学際融合教育研究推進センターが研究者から収集したデータをもとに行われます。',
      start: 'いますぐ診断する',
      network: '学問分野相関図をみる'
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

  h1 > small {
    display: block;
  }
</style>
