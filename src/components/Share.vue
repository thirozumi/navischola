<template lang="pug">
  .section-footer
    h3 {{ title_share }}
    .list-horizontal
      li
        a(:href="twUrl", target="_blank")
          img(src='/assets/images/icon-twitter.svg', alt='Twitter')
      li
        a(:href="fbUrl", target="_blank")
          img(src='/assets/images/icon-facebook.svg', alt='Facebook')
      li
        a(:href="lineUrl", target="_blank")
          img(src='/assets/images/icon-line.svg', alt='LINE')
</template>

<script>
export default {
  name: 'Share',
  data() {
    return {
      title_share: '診断結果をシェアする',
      fbUrl: '',
      twUrl: '',
      lineUrl: ''
    }
  },
  methods: {
    createSnsUrl : function() {
    	let url = encodeURIComponent(location.href);
      let txt = document.title;
      let dsc = document.querySelector("meta[property='og:description']").getAttribute('content');
    	this.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    	this.twUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + txt + ' - ' + dsc;
      this.lineUrl = 'https://social-plugins.line.me/lineit/share?url=' + url;
    },
    createOGImage: function() {
      let og_image = 'http://localhost:8080/assets/images/og_' + this.$route.query.id + '.png';
      document.querySelector("meta[property='og:image']").setAttribute('content', og_image);
    }
  },
  mounted: function() {
    this.createSnsUrl();
    this.createOGImage();
  },
  watch: {
    '$route' (to, from) {
      this.createSnsUrl();
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
