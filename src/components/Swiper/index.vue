<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(story, index) in topStories" :key="index">
      <span>{{story.title}}</span>
      <img :src="image403(story.image)" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
export default {
  data () {
    return {
      swiperOption: {
        direction: 'horizontal',
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      topStories: [] // 轮播图数据
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    axios.get('/api/4/news/latest').then(res => {
      if (res.status === 200) {
        this.topStories = res.data.top_stories
      }
    })
  },
  methods: {
    // 解决访问api图片403禁止访问问题
    image403 (url) {
      if (url !== undefined) {
        return url.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  }
}
</script>

<style>
.swiper {
  width: 100%;
  height: 470px;
  background: #aaa;
}
</style>
