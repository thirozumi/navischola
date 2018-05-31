<template lang="pug">
  transition(name='h')
    .template-home
      section.section-heading-primary
        .section-content
          h1
            img.brand(src='/assets/images/logo-navischola-full.svg', :alt='title_primary + " | " + title_secondary + " - " + subtitle')
          .lead(v-html='lead')
          p.footage
            small {{ note }}
      Slider
      section.section-question
        .section-content
          router-link.nav-left.button-primary.button-lg(v-bind:to="{ name : 'Question', params : { id: 1 }}", tag='button')
            i.icon-oval.icon-chevron-left
            span {{ start }}
      section.section-description
        .section-content
          div(v-html='lead')
          p.footage
            small {{ note }}
      section.section-scope
        .section-content
          ScholaScope
          router-link.nav-right.button-primary.button-lg(v-bind:to="{ name : 'Network' }", tag='button')
            span {{ network }}
            i.icon-oval.icon-chevron-right
      Footer
</template>

<script>
import ScholaScope from '../components/ScholaScope.vue'
import Footer from '../components/Footer.vue'
import Slider from '../components/Slider.vue'

export default {
  name: 'Home',
  components: {
    Footer, ScholaScope, Slider
  },
  data() {
    return {
      title: 'ナビスコラ：学問分野診断＆相関図',
      description: 'あなたにぴったりな学問を見つけよう！',
      path: '/',
      image: '/assets/images/og.png',
      title_primary: 'NaviSchola',
      title_secondary: 'ナビスコラ',
      subtitle: 'あなたにぴったりの学問',
      lead: '<p>大学で研究される学問領域は細分化が進み、いまや学会の数はなんと2,022もあるのだとか。このなかから、本当に「自分らしい学問」と出会うのは至難のわざかもしれません。</p><p>京都大学 学際融合教育研究推進センターは1,757人の研究者からの「生の声」を元に、12の領域の中からあなたに合う学問を教えてくれる診断ツール「Your Schola」と、膨大な学問分野の関係性を解き明かす分野相関図「Schola Scope」を開発しました。</p><p>いま研究者の方も、これから研究者を目指す方も、まずは一度、自分とその学問との「相関」を見てみよう！</p>',
      note: '本診断は京都大学 学際融合教育研究推進センターが研究者から収集したデータをもとに行われます。',
      start: 'いますぐ診断する',
      network: 'つながりをみる'
    }
  },
  methods: {
    setMeta: function() {
      document.title = this.title;
      document.querySelector('meta[property="og:title"]').setAttribute('content', this.title);
  		document.querySelector('meta[property="description"]').setAttribute('content', this.description);
      document.querySelector('meta[property="og:description"]').setAttribute('content', this.description); document.querySelector('meta[property="og:image"]').setAttribute('content', this.$host + this.image);
      document.querySelector('meta[property="og:url"]').setAttribute('content', this.$host + this.path);
    }
  },
  mounted: function() {
    this.setMeta()
  }
}
</script>

<style lang="scss">
  @import "../assets/styles/main.scss";
  .h-enter-active, .h-leave-active {
    transition: all .5s;
  }
  .h-enter, .h-leave-to {
    opacity: 0;
    transform: scale(1.05);
  }
</style>
