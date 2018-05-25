<template lang="pug">
  transition(name='modal-fade')
    .modal-backdrop
      .modal.modal-help(role='dialog', aria-labelledby='modalTitle', aria-describedby='modalDescription')
        a.button-close(href='#', @click='close', aria-label='Close modal', onclick="return false")
          i.icon-oval-inverted-lg.icon-cross
        .modal-content
          header#modalTitle.modal-header
            slot(name='header')
              p {{ lead }}
          section#modalDescription.modal-body
            slot(name='body')
              h4 {{ heading }}
              ul.list-relation
                li(v-for="(item, index) in description", v-bind:class='item.class')
                  i
                  span {{ item.text }}
</template>

<script>
  export default {
    name: 'Help',
    methods: {
      close() {
        this.$emit('close');
      }
    },
    data () {
      return {
        lead: '学問領域の分類は、科学研究費助成事業の細目表に従っています。アンケートにご回答いただいた研究者の数が多いほど学問領域のサイズは大きく、つながっている研究者が多いほど学問領域と学問領域をつなぐ線は太くなっています。',
        heading: '〈選択した学問領域との関係〉',
        description: [
          {
            "class": "rel-primary",
            "text": "同じ分野に属する上に、共通の関心をもった研究者もいるので領域を超えた交流があります。"
          }, {
            "class": "rel-secondary",
            "text": "同じ分野に属するので、領域の親和性は高いですが、研究者同士の交流はまだ活発ではありません。"
          }, {
            "class": "rel-tertiary",
            "text": "異なる分野に属しますが、共通の関心をもつ研究者が分野を越えてつながっており、共同研究の可能性があります。"
          }, {
            "class": "rel-quaternary",
            "text": "異なる分野に属し、研究者同士の関心のつながりも少ないため、今後の交流が待たれます。"
          }
        ]
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
