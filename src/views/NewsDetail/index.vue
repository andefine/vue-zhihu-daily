<template>
  <div class="news-detail">
    <link rel="stylesheet" :href="story.css">
    <detail-header class="detail-header" v-if="story.id" :story-extra="storyExtra" @show-share="toggleShareModal" @collect="notComplete" @to-comment="toComment" @thumb-up="notComplete"></detail-header>
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
      <div class="share-mask" v-show="shareModalIsShow" @click="toggleShareModal">
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
      storyExtra: {},
      shareModalIsShow: false, // 控制分享modal是否显示
      isFirstEnter: false // 是否是第一次进入
    }
  },
  components: {
    DetailHeader: () => import('@/components/DetailHeader'),
    ShareModal: () => import('@/components/ShareModal')
  },
  // 此处是在该组件挂载之后执行的内容，但是在<router-view>外使用了<keep-alive>时，从该页返回到HomePage之后，这一页依然是缓存的，不会被清除，所以在HomePage点击另一条新闻进入这一页时，这一页依然会保持和第一次进入的内容一样。
  created () {
    this.isFirstEnter = true
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'homePage') {
      // 如果是从首页跳转过来的，说明不是返回操作
      to.meta.isBack = false
    } else if (from.name === 'comment') {
      // 如果是从评论页跳转过来的，是返回操作
      to.meta.isBack = true
    }
    next()
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.getNews().then(() => {
        this.getStoryExtra()
      })
    }
  },
  methods: {
    image403,
    // 获取新闻详情
    getNews () {
      return axios.get(`/api/4/news/${this.$route.params.id}`).then(res => {
        if (res.status === 200) {
          this.story = res.data
        }
      })
    },
    // 获取新闻额外消息，获取到的内容需要传递给DetailHeader这个组件
    getStoryExtra () {
      return axios.get(`/api/4/story-extra/${this.story.id}`).then((res) => {
        if (res.status === 200) {
          this.storyExtra = res.data
        }
      })
    },
    // 显示或隐藏分享框
    toggleShareModal () {
      this.shareModalIsShow = !this.shareModalIsShow
    },
    // 点击收藏，略略略
    notComplete () {
      this.$toast({
        message: '假的！点了没用那种，气不气(～￣▽￣)～',
        duration: 200
      })
    },
    toComment () {
      this.$router.push({
        name: 'comment',
        params: {
          id: this.story.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news-detail {
  // height: 100%;
  // overflow: auto;
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
  .container {
    padding-top: 112px;
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
  .share-mask {
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
    transition: opacity 0.2s linear;
  }
}
</style>
