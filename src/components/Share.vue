<template lang="pug">
  .section-footer
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
    },
    ogp: function() {
      var param = location.search.substring(1).split('&');
      var params = [];
      var paramVal = '';
      for(var i = 0; i < param.length; i++) {
        params[i] = param[i].split('=');
      }
      for(var i = 0; i < params.length; i++) {
        if(params[i][0] == 'page') {
          paramVal = parseFloat(params[i][1]);
        }
      }

      if(paramVal == '2') {
        var title = '[書き換えテスト]' + document.title;
        var url = location.href;
        var image = 'http://cly7796.net/wp/sample/rewrite-ogp-with-javascript/01/img' + paramVal + '.jpg';

        document.title = title;
        var headData = document.head.children;
        for (var i = 0; i < headData.length; i++) {
          // OGPの設定
          var propertyVal = headData[i].getAttribute('property');
          if(propertyVal !== null) {
            if(propertyVal.indexOf('og:title') != -1) {
              headData[i].setAttribute('content', title);
            }
            if(propertyVal.indexOf('og:url') != -1) {
              headData[i].setAttribute('content', url);
            }
            if(propertyVal.indexOf('og:image') != -1) {
              headData[i].setAttribute('content', image);
            }
          }
          // OGP(twitter)の設定
          var nameVal = headData[i].getAttribute('name');
          if(nameVal !== null) {
            if(nameVal.indexOf('twitter:title') != -1) {
              headData[i].setAttribute('content', title);
            }
            if(nameVal.indexOf('twitter:image') != -1) {
              headData[i].setAttribute('content', image);
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>
