<template lang="pug">
  transition-group(name='fade', tag='div', class='slider')
    .slider-item(v-for='number in [currentNumber]', :key='number')
      img(:src="currentImage")
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      images: [
        '/assets/images/poster-your-schola-00.svg',
        '/assets/images/poster-your-schola-01.svg',
        '/assets/images/poster-your-schola-02.svg',
        '/assets/images/poster-your-schola-03.svg',
        '/assets/images/poster-your-schola-04.svg',
        '/assets/images/poster-your-schola-05.svg',
        '/assets/images/poster-your-schola-06.svg',
        '/assets/images/poster-your-schola-07.svg',
        '/assets/images/poster-your-schola-08.svg',
        '/assets/images/poster-your-schola-09.svg',
        '/assets/images/poster-your-schola-10.svg',
        '/assets/images/poster-your-schola-11.svg'
      ],
      currentNumber: 0,
      timer: null
    }
  },
  mounted: function () {
    this.startRotation();
  },
  methods: {
    startRotation: function() {
      this.timer = setInterval(this.next, 5000);
    },
    stopRotation: function() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    next: function() {
      this.currentNumber += 1
    },
    prev: function() {
      this.currentNumber -= 1
    }
  },
  computed: {
  	currentImage: function() {
    	return this.images[Math.abs(this.currentNumber) % this.images.length];
    }
  }
}
</script>

<style style="scss">
.fade-enter-active, .fade-leave-active {
  position: absolute;
  transition: all .4s linear;
  overflow: hidden;
  opacity: 1;
  visibility: visible;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
