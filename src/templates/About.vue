<template lang="pug">
  div
    Header
    h1 {{ title }}
    p {{ lead }}
    h2 CREDIT
    ul
      li(v-for='(val, key) in credit') {{ val.role }}: {{ val.name }}
    Footer
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'About',
  components: {
    Header, Footer
  },
  data () {
    return {
      title: '「ナビスコラ」とは？',
      lead: '学術分野間の相互理解促進を目的とし、各分野の価値観(研究感、世界 観、評価基準など)、および行動特性(研究スタイル、研究コミュニティ活動など)を各分野ごとに調査し比較します。調査結果は、分析結果とともに公開とし、WEB掲載の他、冊子作成やシンポジウム開催等を行います。',
      credit: [
        {
          role: 'Producer',
          name: 'Karen R. Garza'
        }, {
          role: 'Art Director',
          name: 'Ronald K. Kirschner'
        }, {
          role: 'Data Scientist',
          name: 'Michael C. Conner'
        }, {
          role: 'Web Development',
          name: 'Troy R. Gower'
        }
      ]
    }
  }
}
</script>
