<template lang="pug">
  transition(name='r')
    .template-result
      section.section-heading-secondary
        .section-content
          h1
            img(src='/assets/images/title-your-schola.svg', :alt="'title_primary' + ' | ' + 'title_secondary'")
      .result-container(v-for="result in results", v-if="result.id == $route.query.id")
        .result-body
          .result-heading
            h3 診断結果
            h2(v-if="result.name_primary !== null")
              small {{ result.name_primary }}
              | {{ result.name_secondary }}
              span タイプ
          .result-map(v-if="result.map !== null", :style="'background-image: url(' + result.map + ')'")
            .result-map-content
          .result-summary
            .result-summary-object
              h4 【なにを研究するの？】
              p {{ result.summary_object }}
            .result-summary-field
              h4 【どんな分野があるの？】
              p {{ result.summary_field }}
            .result-summary-researcher
              h4 【どんな人がやっているの？】
              p {{ result.summary_researcher }}
            .result-summary-message
              h4 【一言ナビ】
              p {{ result.summary_message }}
      .result-footer
        router-link.nav-left.button-primary.button-lg(v-bind:to="{ name : 'Question'}", tag='button')
          i.icon-oval.icon-chevron-left
          span {{ again }}
          i.icon-oval.icon-chevron-right
        router-link.nav-right.button-primary.button-lg(v-bind:to="{ path: '/network', query: { id: $route.query.id}}", tag='button')
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
      'title_primary': 'Your Schola',
      'title_secondary': '学問分野診断',
      'again': 'もう一度診断する',
      'network': '学問分野相関図をみる',
      'results': [
        {
          'id': 0,
          'name_primary': 'Biomedical Sciences',
          'name_secondary': '医歯薬学',
          'summary_object': '人間の健康および病気から、生命活動までを扱う学問領域です。',
          'summary_field': '医学、薬学、歯学、人間医工学、社会医学、看護学など。',
          'summary_researcher': 'この分野の研究者は、みんなと議論することが重要と考える人が比較的多く、研究遂行においては効率が優先されるようです。それにともなってか、研究にはお金が大事と考える人が他分野と比べて一際多かったです。比較的、どの分野とも相性は良さそうで、「個人は社会の一単位にすぎない」と考える人が他分野と比べて多くいました。',
          'summary_message': '医学は、あらゆる生物を扱う生物学とは異なり、人間の身体に特化した学問です。普段は意識しない自分の生命を、改めて見つめ直してみてはどうでしょう。',
          'map': '/assets/images/poster-your-schola-00.svg'
        }, {
          'id': 1,
          'name_primary': 'Informatics',
          'name_secondary': '情報学',
          'summary_object': '計算、通信、統計など、情報を扱うための方法を研究する学問領域です。',
          'summary_field': '図書館情報学、感情情報学、数理情報学、認知科学など。',
          'summary_researcher': 'この分野の研究者は、他の分野と比較して特徴的なことがないことが特徴です。いわゆる理科系と文科系のちょうど中間の性質をもつ研究者が多いようです。むしろ、特徴がないためどの分野とも相性よく仕事ができるともいえます。その一方、実際のところはそれほど他分野と連携しているわけでもなく、意外にも他分野との間にある壁は高いのかもしれません。',
          'summary_message': '機械だけではなく、人間が情報に対してどう知覚し、どんな感情を抱くのかについても扱います。「機械は苦手…」と思ったあなたも安心してください。',
          'map': '/assets/images/poster-your-schola-01.svg'
        }, {
          'id': 2,
          'name_primary': 'Humanities',
          'name_secondary': '人文学',
          'summary_object': '人間が生み出す文化、および、そのなかでの価値判断を考察する学問領域です。',
          'summary_field': '文学、哲学、美学、考古学、文化人類学など。',
          'summary_researcher': 'この分野の研究者は、「主観・客観を疑う」、「この世の絶対的法則の存在を疑う」、そして「個人は社会を構成する一単位にすぎないことはない」といった傾向が突出していました。ちなみに、人付き合いが得意と答えた研究者が一番多いのは、この分野です。対照的な傾向の回答が多かったのは、化学分野。逆に仲良くなれるかも…。',
          'summary_message': '科学のあり方を考察する「科学哲学」のように「学問を研究する学問」という側面をみせることもあります。前提を取り払い、物事を根本から問い直す思考が必要になります。',
          'map': '/assets/images/poster-your-schola-02.svg'
        }, {
          'id': 3,
          'name_primary': 'Biology',
          'name_secondary': '生物学',
          'summary_object': '生命の原理を明らかにするための学問領域です。科学者の知的好奇心から出発した基礎研究と、そこから発展した大型プロジェクトに大別されます。',
          'summary_field': '生物科学、神経科学、人類学、ゲノム科学など。',
          'summary_researcher': 'この分野には、社会課題の解決を重視する研究者は他分野と比べて少ないようです。研究にお金が必要と答えた人は多く、巨大プロジェクトの余波が残っているのでしょうか。「世界を説明する絶対的な法則がある」と答えた研究者は、他分野と比べても平均的でした。研究者の特性からいうと、数物系科学タイプと近しいようです。',
          'summary_message': '単純な細胞に留まらず、脳や幹細胞といったコアな生命機能の解明が進んでいます。顕微鏡を覗いて、ミクロな世界の複雑さを目撃してみてください。',
          'map': '/assets/images/poster-your-schola-03.svg'
        }, {
          'id': 4,
          'name_primary': 'Social Science',
          'name_secondary': '社会科学',
          'summary_object': '人間を社会という集合体として捉え、実験や調査によるデータ分析などの科学的な手法を用い、解明しようとする学問領域です。',
          'summary_field': '政治学、臨床心理学、教育学、法学など。',
          'summary_researcher': 'この分野の研究者は、人文学の傾向と、いわゆる理科系の分野の傾向とがミックスされたような特徴を備えているようです。たとえば、主観・客観を疑う傾向や、この世の絶対的法則の存在を疑う傾向においては人文学タイプと同じですが、「個人は社会を構成する一単位である」と考える点においては正反対でした。',
          'summary_message': '人間が2人以上存在すれば、それは社会学の対象といえます。誰かと会ったとき、あなたとその人との間には「社会」が生まれているはずです。',
          'map': '/assets/images/poster-your-schola-04.svg'
        }, {
          'id': 5,
          'name_primary': 'Mathematical and Physical Sciences',
          'name_secondary': '数物系科学',
          'summary_object': '宇宙、気象現象、素粒子、さらには数学の抽象的な概念といった、自然現象に潜む「法則」を解明する学問領域です。',
          'summary_field': '天文学、宇宙物理、海洋物理、地質学、プラズマ科学など。',
          'summary_researcher': 'この分野の研究者は、社会課題の解決を重視しない人が他の分野と比較して一段と多かったです。研究対象と研究者である自分はくっきりと区別され、この世界の絶対法則を信じて孤軍奮闘する人が多いようです。ちなみに、人付き合いが苦手と答えた人が一番多いのは、この分野でした。どちらかというと生物学タイプと傾向が似ているようです。',
          'summary_message': 'この分野では、世界の観測・実験・考察を通じて、自然現象に潜む法則性の解明を目指します。普段の生活のなかでも、世界と共通する「法則」に思いを馳せてみてください。',
          'map': '/assets/images/poster-your-schola-05.svg'
        }, {
          'id': 6,
          'name_primary': 'General Science & Engineering',
          'name_secondary': '総合理工',
          'summary_object': '理学と工学を横断する分野を扱う学問領域です。たとえば量子ビーム科学は、中性子などを生み出す物理学とレーザーを発生させるための工学が融合した分野です。',
          'summary_field': '量子ビーム科学、計算科学、ナノ・マイクロ科学など。',
          'summary_researcher': 'この分野の研究者は、総合と名が付くだけに、他分野と比べて特に目立つ特徴があるわけではなく、強いていうなら理学系と工学系の中間の傾向がみられます。複合系領域がいわゆる理科系と文科系のミックスなら、こちらは理学と工学の融合というわけです。いうまでもなく理学・工学の研究者と相性がよく、複合領域タイプと同じ傾向がありました。',
          'summary_message': '理学だけ、工学だけでは解決できない領域が増え、注目を浴びている分野です。あなたが考えた理学と工学の組み合わせが、新しい学問分野を生み出す可能性もあります。',
          'map': '/assets/images/poster-your-schola-06.svg'
        }, {
          'id': 7,
          'name_primary': 'Environmental Studies',
          'name_secondary': '環境学',
          'summary_object': '自然、社会、都市など、人間を取り巻く環境を扱う学問領域です。',
          'summary_field': '環境保全学、放射線・化学物質影響科学、持続可能システム学など。',
          'summary_researcher': 'この分野の研究者は、工学分野以上に「社会的課題の解決」を重視する人が多いようです。他分野と議論しながら、どの分野ともうまくできる調和型、ハブ型の研究者が多く活躍している傾向があります。目立った特徴がないという点において情報学タイプ、工学タイプと類似しており、どの分野ともうまくコラボレーションができるでしょう。',
          'summary_message': '動物や植物も含めた身の回りの環境に、人間が与えた影響を考察することになります。「環境のお医者さん」のような気持ちで、自分が生きている世界を見つめるといいかもしれません。',
          'map': '/assets/images/poster-your-schola-07.svg'
        }, {
          'id': 8,
          'name_primary': 'Chemistry',
          'name_secondary': '化学',
          'summary_object': 'あらゆる物質の「結合・反応・構造・物性」を研究する学問領域です。',
          'summary_field': '高分子化学、材料化学、無機化学など。',
          'summary_researcher': 'この分野の研究者は、研究遂行において自分のやり方・主義を大事にする傾向が強い人が多いようです。これは人文学タイプの傾向と対照的でした。一方、人付き合いが得意と答えた人は数物系科学タイプについで低く、孤軍奮闘の研究スタイルのようです。研究にお金がいると考える研究者は、医歯薬学タイプについで2位（生物学タイプと同位）と多い方でした。',
          'summary_message': '物質の構造は変化しないため、200年前の研究結果と最新の研究結果が同じ影響力をもちうる「蓄積型」の分野といえます。化学という学問の礎をつくるのは、あなたかもしれません。',
          'map': '/assets/images/poster-your-schola-08.svg'
        }, {
          'id': 9,
          'name_primary': 'Combined Fields',
          'name_secondary': '複合領域',
          'summary_object': '既存の学問分類では扱うことが難しい、横断的な分野を扱う学問領域です。',
          'summary_field': '人間医工学、脳科学、スポーツ科学、教育工学など。',
          'summary_researcher': '分野に複合と名が付き、いわゆる「理科系・文科系」も横断するため、この分野の研究者は他分野と比べて特に目立つ特徴があるわけではありません。そもそも、コラボレーションのために生まれた比較的新しい学問領域のため、どんな分野とも相性がよく、古典的な研究領域の架け橋となっています。',
          'summary_message': 'いまや分野の1つとなった歴史学や社会学が生まれたのは、19世紀のこと。100年後に一般的になる学問を、あなたがつくり出すことも夢ではありません。',
          'map': '/assets/images/poster-your-schola-09.svg'
        }, {
          'id': 10,
          'name_primary': 'Agriculture',
          'name_secondary': '農学',
          'summary_object': '生物生産・生産環境と人間社会との関わりを研究する学問領域です。',
          'summary_field': '生産環境農学、農芸化学、森林圏科学、水圏応用科学など。',
          'summary_researcher': 'この分野の研究者は、他分野との議論は積極的でないものの、自身の専門一筋ではダメだと考える人が多いです。研究室は仲良しがいいという人が多く、家族感を大事にするタイプといえそうです。リスクをとろうとする人は他分野と比べて一番少なかったのが印象的です（人文学タイプとほぼ同程度）。',
          'summary_message': 'コシヒカリに代表される品種改良や、ブリやクロマグロなど魚の養殖も農学の成果の1つ。農学がなければ、今日のあなたの食事も成り立たなかったかもしれません。',
          'map': '/assets/images/poster-your-schola-10.svg'
        }, {
          'id': 11,
          'name_primary': 'Engineering',
          'name_secondary': '工学',
          'summary_object': '数学と自然科学をベースに、いまだ存在しない状態やモノを実現できるか、人間・社会の利益のために研究する学問領域です。',
          'summary_field': '土木工学、機械工学、建築学、電気電子工学など。',
          'summary_researcher': 'この分野には、社会的課題を解決することが大事だと考える研究者が多いようです。他の分野と比較して、中間的、つまりマイルドな人が多い印象です。唯一意外なのが「価値中立的な研究は可能である」と考えている人が一番多かったこと。対照的な傾向をもつ分野は、数物系科学、人文学でした。',
          'summary_message': 'ライト兄弟の実験から航空工学、飛行機が生まれたように、環境や社会、経済に大きな影響を及ぼしうることが特徴です。あなたの研究が、世界を変える可能性を秘めています。',
          'map': '/assets/images/poster-your-schola-11.svg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/styles/main.scss";
  .r-enter-active, .r-leave-active {
    transition: all .4s;
  }
  .r-enter, .r-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
</style>
