<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal.modal-about(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        a.button-close(href='#', @click='close', aria-label='Close modal', onclick="return false")
          i.icon-oval-inverted-lg.icon-cross
        .modal-content
          header#modalTitle.modal-header
            slot(name='header')
              h3
                img.brand(src='/assets/images/logo-navischola.svg', :alt='title_primary')
          section#modalDescription.modal-body
            slot(name='body')
              | {{ lead }}
          footer.modal-footer
            slot(name='footer')
              p
                small(v-html='button_lead')
              a.button-primary(:href='enquete_link', target='_blank', rel='noopener')
                | {{ enquete_text }}
          aside.modal-aside
            slot(name='aside')
              dl
                dt 〈運営・お問い合わせ〉
                dd(v-html='author')
                dd(v-html='inquiry')
                dt 〈制作〉
                dd(v-html='credit')
</template>

<script>
  export default {
    name: 'About',
    methods: {
      close() {
        this.$emit('close');
      }
    },
    data () {
      return {
        title_primary: 'About Navischola',
        title_secondary: 'ナビスコラとは',
        lead: '京都大学 学際融合教育研究推進センターは、2015年から「学術分野の文化比較大調査」と題して、様々な研究者に各研究分野の価値観（研究観、世界観、評価基準など）、および行動特性（研究スタイル、研究コミュニティ活動など）を調査するアンケートを実施してきました。2016年3月18日時点のデータをもとに、現状の学問体系を知るために開発されたのが「ナビスコラ」です。診断ツール「Your Schola」では、あなたの回答と既存の研究者の回答を照らし合わせ、同じような特性をもつ研究者が多い分野を選出。「Schola Scope」では、1,757人の研究者から得たキーワードのつながりをビジュアライズしました。いまの学問を知るためのツールとして、ご活用ください。',
        button_lead: '＊「学術分野の文化比較大調査」が収集したデータは現在1,757件。日本の研究者を網羅するためには、約20,000件が必要です。研究者の方はアンケートに是非ともご協力ください。',
        enquete_text: 'アンケートに回答する',
        enquete_link: 'https://survey2015.symposium-hp.jp/apply.php',
        author: '京都大学 学際融合教育研究推進センター<br>住所｜京都市左京区吉田本町 文学部東館358号<br>TEL｜075-753-5338／MAIL｜info@cpier.kyoto-u.ac.jp<br>WEB｜<a href="http://www.cpier.kyoto-u.ac.jp/" target="_blank" rel="noopener">http://www.cpier.kyoto-u.ac.jp/</a>',
        inquiry: '研究者の方に向けた本プロジェクト詳細は<a href="http://www.cpier.kyoto-u.ac.jp/2018/05/navischola/" target="_blank"  rel="noopener">こちら</a>から',
        credit: '監修：宮野公樹（京都大学 学際融合教育研究推進センター）／クリエイティブディレクション：若林恵（blkswn）／イラストレーション：浜名信次（Beach）／データ解析・ビジュアライズ：出雲翔（habitech Inc.）／デザイン：谷戸正樹／ウェブデベロップメント：竹田大純／編集・ライティング：矢代真也（合同会社飛ぶ教室）'
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
