<template>
  <div class="news-detail">
    <link rel="stylesheet" :href="story.css">
    <div class="container">
      <div class="top">
        <img class="img" :src="image403(story.image)" alt="">
        <div class="mask"></div>
        <span class="title">{{story.title}}</span>
        <span class="image-source">{{story.image_source}}</span>
      </div>
      <div class="my-body" v-html="image403(story.body)"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import image403 from '../../utils/image403'
export default {
  data () {
    return {
      story: {}
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    image403,
    getNews () {
      return axios.get(`/api/4/news/${this.$route.params.id}`).then(res => {
        if (res.status === 200) {
          this.story = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news-detail {
  height: 100%;
  overflow: auto;
  .container {
    position: relative;
    .top {
      width: 100%;
      height: 420px;
      position: absolute;
      overflow: hidden;
      color: #fff;
      .img {
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      .mask {
        width: 100%;
        height: 420px;
        position: absolute;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
      }
      .title {
        position: absolute;
        left: 0;
        bottom: 50px;
        padding: 0 20px;
        line-height: 60px;
      }
      .image-source {
        position: absolute;
        right: 40px;
        bottom: 15px;
        font-size: 24px;
        opacity: 0.7;
      }
    }
    .my-body {
      // position: absolute;
    }
  }
}
</style>
