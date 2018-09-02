<template>
  <div class="news-detail">
    <link rel="stylesheet" :href="story.css">
    <detail-header v-if="story.id" :storyId="story.id" @show-share="toggleShareModal"></detail-header>
    <div class="container">
      <div class="top" v-if="story.image">
        <img class="img" :src="image403(story.image)" alt="">
        <div class="mask"></div>
        <span class="title">{{story.title}}</span>
        <span class="image-source">{{story.image_source}}</span>
      </div>
      <div class="my-body" v-html="image403(story.body)"></div>
    </div>

    <!-- 点击头部分享按钮显示的分享方式 -->
    <transition name="fade">
      <div class="mask" v-show="shareModalIsShow" @click="toggleShareModal">
        <share-modal class="share-modal" v-show="shareModalIsShow"></share-modal>
      </div>
    </transition>

  </div>
</template>

<script>
import axios from 'axios'
import image403 from '../../utils/image403'
export default {
  data () {
    return {
      story: {},
      shareModalIsShow: false // 控制分享modal是否显示
    }
  },
  components: {
    DetailHeader: () => import('@/components/DetailHeader'),
    ShareModal: () => import('@/components/ShareModal')
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
    },
    toggleShareModal () {
      this.shareModalIsShow = !this.shareModalIsShow
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
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    .share-modal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
}
</style>
