<template lang="pug">
  transition(name='q')
    .template-question
      section.section-heading-secondary
        .section-content
          h1
            img(src='/assets/images/title-your-schola.svg', :alt="title_alt")
      section.section-question-main(v-show="count < count_max")
        .section-content
          .question-title
            strong QUESTION {{ current }}
            h1.question-summary(v-for="question in questions", v-if="count == question.id", v-html='question.summary')
          ul.list-horizontal(v-for="question in questions", v-if="count == question.id")
            li
              button.button-primary(v-show="count < (count_max - 1)", v-on:click="getNext(0)") YES
              router-link.button-primary(v-show="count == (count_max - 1)", tag="button", v-bind:to="{ name: 'Result', params: { id: getId(), s: getSubject() }}") YES
            li
              button.button-primary(v-show="count < (count_max - 1)", v-on:click="getNext(1)") NO
              router-link.button-primary(v-show="count == (count_max - 1)", tag="button", v-bind:to="{ name: 'Result', params: { id: getId(), s: getSubject() }}") NO
          p.question-count(v-show="count !== count_max") {{ current }} / {{ count_max }}
      Footer
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Question',
  components: {
    Header, Footer
  },
  data() {
    return {
      title: '分野診断ツール：Your Schola｜ナビスコラ：学問分野診断＆相関図',
      description: 'あなたにぴったりな学問を見つけよう！',
      path: '/question',
      image: '/assets/images/og.png',
      title_primary: 'Your Schola',
      title_secondary: '学問分野診断',
      count: 0,
      count_max: 20,
      d: [],
      show: true,
      questions: [
        {
          "id": "0",
          "summary": "社会の役に立たないと、自分がやっていることには意味がないと思う。"
        }, {
          "id": "1",
          "summary": "どんな時でも、偏見にとらわれず判断できると思う。"
        }, {
          "id": "2",
          "summary": "誰かとわいわい取り組んだほうが、一人でやるよりも上手くいく。"
        }, {
          "id": "3",
          "summary": "成果をあげるためには、わき目もふらずに取り組む必要があると思う。"
        }, {
          "id": "4",
          "summary": "自分の頭で考えている以上、「客観的」であることは原理的に不可能だと思う。"
        }, {
          "id": "5",
          "summary": "結局お金がなければ、何事も成し遂げられないと思う。"
        }, {
          "id": "6",
          "summary": "この世界には、人知を超えた法則が存在していると思う。"
        }, {
          "id": "7",
          "summary": "世界は複雑だと思う。"
        }, {
          "id": "8",
          "summary": "自分が明日死んだとしても、世の中は変わらないと思う。"
        }, {
          "id": "9",
          "summary": "どんなに自堕落な人でも、理性的な部分はどこかにあると思う。"
        }, {
          "id": "10",
          "summary": "効率が悪い仲間を見ていると、イライラする。"
        }, {
          "id": "11",
          "summary": "失敗を恐れずに冒険ができる人たちと一緒にいたい。"
        }, {
          "id": "12",
          "summary": "誰かと一緒に何かをやるなら、仲良くなったほうがトクだと思う。"
        }, {
          "id": "13",
          "summary": "自分のこだわりは、どんな状況でも大切だと思う。"
        }, {
          "id": "14",
          "summary": "人付き合いは、得意なほうだと思う。"
        }, {
          "id": "15",
          "summary": "どうせやるなら、何事にも全力で取り組みたい。"
        }, {
          "id": "16",
          "summary": "自分が達成したことを、世の中に知らしめたいと思うことがある。"
        }, {
          "id": "17",
          "summary": "知らない人としゃべることは、自分のためになると思う。"
        }, {
          "id": "18",
          "summary": "見たことも聞いたこともない場所に行ってみたいと思うことがある。"
        }, {
          "id": "19",
          "summary": "真剣にやるからには、必ず結果を出さないとダメだと思う。"
        }
      ],
    }
  },
  created: function() {
    this.setMeta()
  },
  computed: {
    title_alt: function() {
      return this.title_primary + ' | ' + this.title_secondary
    },
    current: function() {
      return this.count + 1;
    }
  },
  methods: {
    setMeta: function() {
      document.title = this.title;
      document.querySelector('meta[property="og:title"]').setAttribute('content', this.title);
  		document.querySelector('meta[property="description"]').setAttribute('content', this.description);
      document.querySelector('meta[property="og:description"]').setAttribute('content', this.description); document.querySelector('meta[property="og:image"]').setAttribute('content', this.$host + this.image);
      document.querySelector('meta[property="og:url"]').setAttribute('content', this.$host + this.path);
    },
    init: function() {
      this.count = 0;
    },
    getNext: function(val) {

      this.count++;
      this.d.push(val);
      //console.log('push, ', this.d);
    },
    getId: function() {
      if(this.d[0] <= 0.5)
      if(this.d[4] <= 0.5)
      if(this.d[6] <= 0.5)
      if(this.d[10] <= 0.5)
      if(this.d[12] <= 0.5)
      return "11" // 工学
      else // if d[12] > 0.5
      return "11" // 工学
      else // if d[10] > 0.5
      return "2" // 人文学
      else // if d[6] > 0.5
      if(this.d[14] <= 0.5)
      if(this.d[10] <= 0.5)
      if(this.d[12] <= 0.5)
      return "4" // 社会科学
      else // if d[12] > 0.5
      return "3" // 生物学
      else // if d[10] > 0.5
      return "4" // 社会科学
      else // if d[14] > 0.5
      if(this.d[8] <= 0.5)
      if(this.d[13] <= 0.5)
      if(this.d[11] <= 0.5)
      return "7" // 環境学
      else // if d[11] > 0.5
      return "3" // 生物学
      else // if d[13] > 0.5
      return "0"  // 医歯薬学
      else // if d[8] > 0.5
      return "4" // 社会科学
      else // if d[4] > 0.5
      if(this.d[2] <= 0.5)
      if(this.d[11] <= 0.5)
      if(this.d[13] <= 0.5)
      if(this.d[5] <= 0.5)
      if(this.d[6] <= 0.5)
      return "11" // 工学
      else // if d[6] > 0.5
      if(this.d[9] <= 0.5)
      return "9" // 複合領域
      else // if d[9] > 0.5
      return "7" // 環境学
      else // if d[5] > 0.5
      return "8" // 化学
      else // if d[13] > 0.5
      return "4" // 社会科学
      else // if d[11] > 0.5
      if(this.d[12] <= 0.5)
      return "10" // 農学
      else // if d[12] > 0.5
      if(this.d[5] <= 0.5)
      return "8" // 化学
      else // if d[5] > 0.5
      return "5" // 数物系科学
      else // if d[2] > 0.5
      if(this.d[3] <= 0.5)
      if(this.d[1] <= 0.5)
      return "10" // 農学
      else // if d[1] > 0.5
      return "6" // 総合理工
      else // if d[3] > 0.5
      return "1" // 情報学
      else // if d[0] > 0.5
      if(this.d[4] <= 0.5)
      if(this.d[1] <= 0.5)
      if(this.d[6] <= 0.5)
      if(this.d[12] <= 0.5)
      return "7" // 環境学
      else // if d[12] > 0.5
      return "8" // 化学
      else // if d[6] > 0.5
      return "9" // 複合領域
      else // if d[1] > 0.5
      if(this.d[6] <= 0.5)
      return "6" // 総合理工
      else // if d[6] > 0.5
      if(this.d[10] <= 0.5)
      return "9" // 複合領域
      else // if d[10] > 0.5
      return "3" // 生物学
      else // if d[4] > 0.5
      if(this.d[5] <= 0.5)
      return "9" // 複合領域
      else // if d[5] > 0.5
      if(this.d[10] <= 0.5)
      return "9" // 複合領域
      else // if d[10] > 0.5
      if(this.d[6] <= 0.5)
      if(this.d[2] <= 0.5)
      return "6" // 総合理工
      else // if d[2] > 0.5
      return "6" // 総合理工
      else // if d[6] > 0.5
      return "6" // 総合理工
    },
    getSubject: function() {
      if(this.d[0] <= 0.5)
      if(this.d[4] <= 0.5)
      if(this.d[6] <= 0.5)
      if(this.d[10] <= 0.5)
      if(this.d[12] <= 0.5)
      return "engineering" // 工学
      else // if d[12] > 0.5
      return "engineering" // 工学
      else // if d[10] > 0.5
      return "humanitiess" // 人文学
      else // if d[6] > 0.5
      if(this.d[14] <= 0.5)
      if(this.d[10] <= 0.5)
      if(this.d[12] <= 0.5)
      return "social-science" // 社会科学
      else // if d[12] > 0.5
      return "biology" // 生物学
      else // if d[10] > 0.5
      return "social-science" // 社会科学
      else // if d[14] > 0.5
      if(this.d[8] <= 0.5)
      if(this.d[13] <= 0.5)
      if(this.d[11] <= 0.5)
      return "environmental-studies" // 環境学
      else // if d[11] > 0.5
      return "biology" // 生物学
      else // if d[13] > 0.5
      return "biomedical-sciences"  // 医歯薬学
      else // if d[8] > 0.5
      return "social-science" // 社会科学
      else // if d[4] > 0.5
      if(this.d[2] <= 0.5)
      if(this.d[11] <= 0.5)
      if(this.d[13] <= 0.5)
      if(this.d[5] <= 0.5)
      if(this.d[6] <= 0.5)
      return "engineering" // 工学
      else // if d[6] > 0.5
      if(this.d[9] <= 0.5)
      return "combined-fields" // 複合領域
      else // if d[9] > 0.5
      return "environmental-studies" // 環境学
      else // if d[5] > 0.5
      return "chemistry" // 化学
      else // if d[13] > 0.5
      return "social-science" // 社会科学
      else // if d[11] > 0.5
      if(this.d[12] <= 0.5)
      return "agriculture" // 農学
      else // if d[12] > 0.5
      if(this.d[5] <= 0.5)
      return "chemistry" // 化学
      else // if d[5] > 0.5
      return "mathematical-and-physical-sciences" // 数物系科学
      else // if d[2] > 0.5
      if(this.d[3] <= 0.5)
      if(this.d[1] <= 0.5)
      return "agriculture" // 農学
      else // if d[1] > 0.5
      return "general-science-and-engineering" // 総合理工
      else // if d[3] > 0.5
      return "informatics" // 情報学
      else // if d[0] > 0.5
      if(this.d[4] <= 0.5)
      if(this.d[1] <= 0.5)
      if(this.d[6] <= 0.5)
      if(this.d[12] <= 0.5)
      return "environmental-studies" // 環境学
      else // if d[12] > 0.5
      return "chemistry" // 化学
      else // if d[6] > 0.5
      return "combined-fields" // 複合領域
      else // if d[1] > 0.5
      if(this.d[6] <= 0.5)
      return "general-science-and-engineering" // 総合理工
      else // if d[6] > 0.5
      if(this.d[10] <= 0.5)
      return "combined-fields" // 複合領域
      else // if d[10] > 0.5
      return "biology" // 生物学
      else // if d[4] > 0.5
      if(this.d[5] <= 0.5)
      return "combined-fields" // 複合領域
      else // if d[5] > 0.5
      if(this.d[10] <= 0.5)
      return "combined-fields" // 複合領域
      else // if d[10] > 0.5
      if(this.d[6] <= 0.5)
      if(this.d[2] <= 0.5)
      return "general-science-and-engineering" // 総合理工
      else // if d[2] > 0.5
      return "general-science-and-engineering" // 総合理工
      else // if d[6] > 0.5
      return "general-science-and-engineering" // 総合理工
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
.q-enter-active, .q-leave-active {
  transition: all .5s;
}
.q-enter, .q-leave-to {
  opacity: 0;
  transform: translate(-10vw, 0);
}
</style>
