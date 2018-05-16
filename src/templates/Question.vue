<template lang="pug">
  .template-question
    section.section-heading-secondary
      .section-content
        h1
          img(src='/assets/images/title-your-schola.svg', :alt="title")
      section.section-question-main(v-show="count < count_max")
        .section-content
          .question-title
            strong QUESTION {{ current }}
          h1.question-summary(v-for="question in questions", v-if="count == question.id", v-html='question.summary')
          ul.list-horizontal(v-for="question in questions", v-if="count == question.id")
            li
              button.button-primary(v-show="count < (count_max - 1)", v-on:click="getNext(0)") YES
              router-link.button-primary(v-show="count == (count_max - 1)", tag="button", v-bind:to="{ path: '/result', query: { id: getId()}}") YES
            li
              button.button-primary(v-show="count < (count_max - 1)", v-on:click="getNext(1)") NO
              router-link.button-primary(v-show="count == (count_max - 1)", tag="button", v-bind:to="{ path: '/result', query: { id: getId()}}") NO
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
      title_primary: 'Your Schola',
      title_secondary: '学問分野診断',
      count: 0,
      count_max: 20,
      d: [],
      questions: [
        {
          "id": "0",
          "summary": "自分がやっていることが、社会の役にたっていると思うと気分がいい。"
        }, {
          "id": "1",
          "summary": "どんな状況でも、ひいきはよくないと思う。"
        }, {
          "id": "2",
          "summary": "誰かと取り組んだほうが、一人でやるよりも上手くいくと思う。"
        }, {
          "id": "3",
          "summary": "成果をあげるためには、その他のことを犠牲にしても構わないと思う。"
        }, {
          "id": "4",
          "summary": "何かに熱中していると、我を失うことがあるが、それが悪いとは思わない。"
        }, {
          "id": "5",
          "summary": "お金のことにキチンとしていない人を見ると、イラッとする。"
        }, {
          "id": "6",
          "summary": "理不尽なことが起きたとき、そこには何か理由があると思う。"
        }, {
          "id": "7",
          "summary": "「風が吹けば桶屋が儲かる」ということわざを、その通りだと思う。"
        }, {
          "id": "8",
          "summary": "自分が明日死んだとしても、世界はそのまま回り続けると思う。"
        }, {
          "id": "9",
          "summary": "自堕落な生活をしている人を見ると、人間失格だと思ってしまう。"
        }, {
          "id": "10",
          "summary": "効率が悪い作業をしている人をみると、助けてあげたいと思う。"
        }, {
          "id": "11",
          "summary": "自分ができない冒険をする上司（先輩）に憧れる。"
        }, {
          "id": "12",
          "summary": "誰かと一緒に何かをやるなら、仲良くなったほうがトクだと思う。"
        }, {
          "id": "13",
          "summary": "自分が信じることを、曲げるのはイヤだ。"
        }, {
          "id": "14",
          "summary": "人付き合いは得意なほうだと思う。"
        }, {
          "id": "15",
          "summary": "人生で好きなことをやっていられるなら、生活レヴェルを下げることは厭わない。"
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
          "summary": "海外で暮らしたことがある人とない人の間には、大きな違いがあると思う。"
        }
      ],
    }
  },
  computed: {
    title() {
      return this.title_primary + ' | ' + this.title_secondary
    },
    current: function() {
      return this.count + 1;
    }
  },
  methods: {
    init: function() {
      this.count = 0;
    },
    getNext: function(val) {
      this.count++;
      this.d.push(val);
      console.log('push, ', this.d);
    },
    getPrevious: function() {
      this.count--;
      this.d.pop();
      console.log('pop, ', this.d);
    },
    getId: function() {
      if(this.d[0] <= 0.5)
        if(this.d[4] <= 0.5)
          if(this.d[6] <= 0.5)
            if(this.d[10] <= 0.5)
              if(this.d[12] <= 0.5)
                return "11" // 医歯薬学
              else // if d[12] > 0.5
                return "11" // 医歯薬学
            else // if d[10] > 0.5
              return "2" // 複合領域
          else // if d[6] > 0.5
            if(this.d[14] <= 0.5)
              if(this.d[10] <= 0.5)
                if(this.d[12] <= 0.5)
                  return "4" // 社会科学
                else // if d[12] > 0.5
                  return "3" // 人文学
              else // if d[10] > 0.5
                return "4" // 社会科学
            else // if d[14] > 0.5
              if(this.d[8] <= 0.5)
                if(this.d[13] <= 0.5)
                  if(this.d[11] <= 0.5)
                    return "7" // 化学
                  else // if d[11] > 0.5
                    return "3" // 人文学
                else // if d[13] > 0.5
                  return "0"  // 情報学
              else // if d[8] > 0.5
                return "4" // 社会科学
        else // if d[4] > 0.5
          if(this.d[2] <= 0.5)
            if(this.d[11] <= 0.5)
              if(this.d[13] <= 0.5)
                if(this.d[5] <= 0.5)
                  if(this.d[6] <= 0.5)
                    return "11" // 医歯薬学
                  else // if d[6] > 0.5
                    if(this.d[9] <= 0.5)
                      return "9" // 生物学
                    else // if d[9] > 0.5
                      return "7" // 化学
                else // if d[5] > 0.5
                  return "8" // 工学
              else // if d[13] > 0.5
                return "4" // 社会科学
            else // if d[11] > 0.5
              if(this.d[12] <= 0.5)
                return "10" // 農学
              else // if d[12] > 0.5
                if(this.d[5] <= 0.5)
                  return "8" // 工学
                else // if d[5] > 0.5
                  return "5" // 総合理工
          else // if d[2] > 0.5
            if(this.d[3] <= 0.5)
              if(this.d[1] <= 0.5)
                return "10" // 農学
              else // if d[1] > 0.5
                return "6" // 数物系科学
            else // if d[3] > 0.5
              return "1" // 環境学
      else // if d[0] > 0.5
        if(this.d[4] <= 0.5)
          if(this.d[1] <= 0.5)
            if(this.d[6] <= 0.5)
              if(this.d[12] <= 0.5)
                return "7" // 化学
              else // if d[12] > 0.5
                return "8" // 工学
            else // if d[6] > 0.5
              return "9" // 生物学
          else // if d[1] > 0.5
            if(this.d[6] <= 0.5)
              return "6" // 数物系科学
            else // if d[6] > 0.5
              if(this.d[10] <= 0.5)
                return "9" // 生物学
              else // if d[10] > 0.5
                return "3" // 人文学
        else // if d[4] > 0.5
          if(this.d[5] <= 0.5)
            return "9" // 生物学
          else // if d[5] > 0.5
            if(this.d[10] <= 0.5)
              return "9" // 生物学
            else // if d[10] > 0.5
              if(this.d[6] <= 0.5)
                if(this.d[2] <= 0.5)
                  return "6" // 数物系科学
                else // if d[2] > 0.5
                  return "6" // 数物系科学
              else // if d[6] > 0.5
                return "6" // 数物系科学
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
.s-enter-active, .s-leave-active {
  transition: all .5s linear;
}
.s-enter, .s-leave-to {
  opacity: 0;
  transform: translate(1rem, 0);
}
</style>
