<template lang="pug">
  div
    h1
      small {{ title_secondary }}
      | {{ title_primary }}
    p {{ subtitle }}
    p {{ lead }}
    p
      router-link(v-bind:to="{ name : 'Question', params : { id: 1 }}", tag='button') {{ button }}
    p
      small {{ note }}
    Footer
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Footer
  },
  data() {
    return {
      title_primary: 'NaviSchola',
      title_secondary: 'ナビスコラ',
      subtitle: 'あなたにぴったりの学問',
      lead: 'いま学問が揺れ動きつつあります。科学を基礎に置き分類されたアカデミアは過度な分析、いわゆる「たこつぼ化」が叫ばれ、硬直化が進んでしまいました。いまあなたが必要な学問はどこにあるのでしょう。京都大学・学際融合教育研究推進センターは 1,700 人の研究者からのアンケートを元に独自のアルゴリズムを開発。20個の質問に答えることで、あなたに最適な学問分野を診断します。さらに、アンケート結果を元にした最新の知の見取り図を体験して、あなたのスコラ（学ぶ場所）を見つけてみてください。',
      note: '本診断は京都大学学際融合教育研究推進センターが 1,700 名の研究者から収集した 2017年12月31日時点のデータをもとに行われます。',
      button: 'いますぐ診断する'
    }
  }
}
</script>

<style lang="scss">
  h1 > small {
    display: block;
  }
</style>
