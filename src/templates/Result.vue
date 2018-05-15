<template lang="pug">
  .result
    section.section-heading-secondary
      .section-content
        h1
          img(src='/assets/images/title-your-schola.svg', :alt="title")
    div(v-for="result in results", v-if="result.id == $route.query.id")
      h2(v-if="result.name_primary !== null") {{ result.name_primary }}
      h3 {{ result.name_secondary }}
      p {{ result.summary }}
      p(v-if="result.map !== null")
        img(v-bind:src="result.map")
      router-link.nav-left.button-primary.button-lg(v-bind:to="{ name : 'Question'}", tag='button')
        i.icon-oval.icon-chevron-left
        span {{ again }}
        i.icon-oval.icon-chevron-right
      router-link.nav-right.button-primary.button-lg(v-bind:to="{ name : 'Network'}", tag='button')
        span {{ network }}
        i.icon-oval.icon-chevron-right
    Footer
    Share      
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Share from '../components/Share.vue'

export default {
  name: 'Result',
  components: {
    Header, Footer, Share
  },
  data() {
    return {
      'title_primary': 'Academic Atlas',
      'title_secondary': '学問のいまを映す「知の見取り図」',
      'again': 'もう一度診断する',
      'network': '学問分野相関図をみる',
      'results': [
        {
          'id': 0,
          'name_primary': 'Informatics',
          'name_secondary': '情報学',
          'summary': '計算、通信、統計など、情報を扱うための方法を研究する学問です。人間を含む生物も、コンピューターも、全体としての整合が取れた行動を行うためには、情報の活用が不可欠。機械だけではなく、人間が情報に対してどう知覚し、どんな感情を抱くのかも扱うので、機械は苦手！と思ったあなたもご安心ください。（ex.図書館情報学、感情情報学、数理情報学、認知科学）',
          'map': 'http://via.placeholder.com/640x480?text=Informatics'
        }, {
          'id': 1,
          'name_primary': 'Environmental Studies',
          'name_secondary': '環境学',
          'summary': '自然、社会、都市など、人間を取り巻く環境を扱う学問です。動物や植物も含めた環境に人間が与えた影響を考察しながら自然保護などの方法を模索することになるので、「環境のお医者さん」のような側面があります。環境を対象として、文理を問わない学問分野の手法が用いられていますから、あなたの興味からアプローチを考えてみるのもいいかもしれません。（ex.環境保全学、放射能・化学物質影響科学、持続可能システム）',
          'map': 'http://via.placeholder.com/640x480?text=Environmental+Studies'
        }, {
          'id': 2,
          'name_primary': 'Combined Fields',
          'name_secondary': '複合領域',
          'summary': '既存の学問分類では扱うことが難しい横断的な学問を扱う領域です。専門にこだわることなく、幅広い領域の専門家が集まり、新たな学問の創成に力を注いでいることが特徴です。歴史学や社会学が生まれたのは19世紀であることを考えると、100年後に一般的な学問がここから生まれてもおかしくありません。前例がないことに挑戦してみてください。（ex.人間医工学、脳科学、スポーツ科学、教育工学）',
          'map': 'http://via.placeholder.com/640x480?text=Combined+Fields'
        }, {
          'id': 3,
          'name_primary': 'Humanities',
          'name_secondary': '人文学',
          'summary': '人間という存在を研究する学問です。主に言語や宗教、哲学、芸術などの人間が生み出す文化を扱いながら、社会や経済に関しても人間という主体がいかなる価値判断、意味認識を行うのか考察します。科学哲学などの分野では、「学問を研究する学問」という側面をみせることも。あなたの興味があることを、ちょっと立ち止まって考えてもいいかもしれません。（ex.美学、考古学、文化人類学）',
          'map': 'http://via.placeholder.com/640x480?text=Humanities'
        }, {
          'id': 4,
          'name_primary': 'Social Science',
          'name_secondary': '社会科学',
          'summary': '人間を社会という集合体として捉え、実験や調査によるデータ分析などの科学的な手法を用い、解明しようとする学問です。人間が2人以上存在すれば、それは社会といえます。カラオケから国会、戦争から心理作用までを扱うことができます。誰かと会ったときに、その人と自分の間に生まれた「社会」について考えてみてください。（ex.政治学、臨床心理学、教育学、法学）',
          'map': 'http://via.placeholder.com/640x480?text=Social+Science'
        }, {
          'id': 5,
          'name_primary': 'General Science & Engineering',
          'name_secondary': '総合理工',
          'summary': '理学と工学を横断する領域を扱います。たとえば量子ビーム科学は、中性子などを生み出す物理学とレーザーを発生させるための工学が融合した学問です。数学・物理学・工学・化学のカテゴリには当てはまらない領域が近年増えたことで、注目が集まっています。あなたが考えた理学と工学の組み合わせが、新しい学問を生み出すかもしれません。（ex.量子ビーム科学、計算科学、ナノ・マイクロ科学）',
          'map': 'http://via.placeholder.com/640x480?text=General+Science+&+Engineering'
        }, {
          'id': 6,
          'name_primary': 'Mathematical and Physical Sciences',
          'name_secondary': '総合理工',
          'summary': '理学と工学を横断する領域を扱います。たとえば量子ビーム科学は、中性子などを生み出す物理学とレーザーを発生させるための工学が融合した学問です。数学・物理学・工学・化学のカテゴリには当てはまらない領域が近年増えたことで、注目が集まっています。あなたが考えた理学と工学の組み合わせが、新しい学問を生み出すかもしれません。（ex.量子ビーム科学、計算科学、ナノ・マイクロ科学）',
          'map': 'http://via.placeholder.com/640x480?text=Mathematical+and+Physical+Sciences'
        }, {
          'id': 7,
          'name_primary': 'Chemistry',
          'name_secondary': '化学',
          'summary': 'ありとあらゆる物質の「結合・反応・構造・物性」を研究する学問です。原子・分子レベルから対象物の構造・性質を理解し、物質相互での影響を観察することで、自然界の制御を試みます。物質の構造は変化しないため、200年前の研究結果と最新の研究結果が同じ影響力を持ちうる、「蓄積型」の領域といえます。あなたの研究が、未来の化学の礎となるのです。（ex.高分子化学、材料化学、無機化学）',
          'map': 'http://via.placeholder.com/640x480?text=Chemistry'
        }, {
          'id': 8,
          'name_primary': 'Engineering',
          'name_secondary': '工学',
          'summary': '数学と自然科学をベースに、未だ存在しない状態やモノを実現できるかを人間・社会の利益のために研究する学問です。ライト兄弟の実験成功から航空工学が生まれ、飛行機が一般的になったように、環境や社会、経済に影響を及ぼす強力な力を持ちえることが特徴です。あなたの研究が、世界を変えるかもしれません。（ex. 土木工学、機械工学、建築学、電気電子工学）',
          'map': 'http://via.placeholder.com/640x480?text=Engineering'
        }, {
          'id': 9,
          'name_primary': 'Biology',
          'name_secondary': '生物学',
          'summary': '生命の原理を明らかにするための学問です。科学者の知的好奇心から出発した基礎研究と、そこから発展した大型プロジェクトに大別されます。単純な細胞の原理だけに留まらず、脳や幹細胞といった高次生命機能といわれる複雑なメカニズムの解明が進んでいます。顕微鏡からミクロな世界を覗いてみると、見えなかったことが見えてくるかもしれません。（ex.生物科学、神経科学、人類学、ゲノム科学）',
          'map': 'http://via.placeholder.com/640x480?text=Biology'
        }, {
          'id': 10,
          'name_primary': 'Agriculture',
          'name_secondary': '農学',
          'summary': '生物生産・生産環境と人間社会との関わりを研究する学問です。人の命や生活を支える様々な生物、そして土壌、水文、大気などのフィールドを扱います。いわゆる第一次産業を支えることで、社会の発展に貢献してきました。コシヒカリに代表される品種改良もその1つ。あなたのいまの生活を、どんな「農学」が支えているか、考えてみてもいいかもしれません。（ex.生産環境農学、農芸化学、森林圏科学、水圏応用科学）',
          'map': 'http://via.placeholder.com/640x480?text=Agriculture'
        }, {
          'id': 11,
          'name_primary': 'Biomedical Science',
          'name_secondary': '医歯薬学',
          'summary': '人間の健康および病気から、生命活動までを扱う学問です。臨床での治療を目的として科学を生命に応用するだけではなく、工学との融合による人工骨などの技術開発や、社会科学との連携のもと、生命活動を行っている人間の内面を解き明かすこともあります。自分の身体を見つめ直す、いい機会かもしれません。（ex.薬学、歯学、人間医工学、社会医学、看護学…）',
          'map': 'http://via.placeholder.com/640x480?text=Biomedical+Science'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/styles/main.scss";
</style>
