<template lang="pug">
  .share
    h3 {{ title_share }}
    .list-horizontal
      li
        a(:href="'http://twitter.com/share?url=' + url", onclick="window.open(encodeURI(decodeURI(this.href)), 'TWwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;", rel='nofollow')
          img(src='/assets/images/icon-twitter.svg', alt='Twitter')
      li
        a(:href="'http://www.facebook.com/share.php?u=' + url", onclick="window.open(this.href, 'FBwindow', 'width=650, height=450, menubar=no, toolbar=no, scrollbars=yes'); return false;")
          img(src='/assets/images/icon-facebook.svg', alt='Facebook')
      li
        a(:href="'https://social-plugins.line.me/lineit/share?url=' + url", onclick="window.open(encodeURI(decodeURI(this.href)), 'LINEwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;", rel='nofollow')
          img(src='/assets/images/icon-line.svg', alt='LINE')
</template>

<script>
export default {
  name: 'Share',
  data() {
    return {
      title_share: '診断結果をシェアする'
    }
  },
  computed: {
    url: function() {
      let _url = window.location.href;
      return _url;
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
