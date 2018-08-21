<template>
  <swiper class="swiper" :options="swiperOption" v-if="topStories.length > 0">
    <swiper-slide class="slide" v-for="(story, index) in topStories" :key="index">
      <img class="img" :src="image403(story.image)" alt="">
      <div class="mask"></div>
      <span class="title">{{story.title}}</span>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'
import image403 from '@/utils/image403'
export default {
  data () {
    let vm = this
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          tap: function () {
            // clickedIndex下标从1开始
            vm.$router.push({ name: 'newsDetail', params: { id: vm.topStories[this.clickedIndex - 1].id } })
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['topStories'])
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    // 解决访问api图片403禁止访问问题
    image403,
    toNewsDetail (id) {
      console.log(1)
      this.$router.push({ path: `newsDetail/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 470px;
  .slide {
    width: 100%;
    height: 100%;
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    }
    .img {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      font-size: 46px;
      line-height: 54px;
      position: absolute;
      left: 0;
      bottom: 55px;
      padding: 0 34px;
      color: #fffffc;
    }
  }
}
</style>

<style lang="scss">
  .swiper-pagination-bullet {
    background: #88878d;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: #fffffd;
      opacity: 1;
    }
  }
</style>
