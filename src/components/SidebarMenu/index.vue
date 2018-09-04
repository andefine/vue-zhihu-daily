<template>
  <div class="sidebar" @click.stop.prevent>
    <div class="header">
      <div class="user">
        <img class="avatar" @click="notComplete" :src="image403('http://pic1.zhimg.com/da8e974dc_m.jpg')" alt="">
        <span class="name" @click="notComplete">请登录</span>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in twoItems" :key="index" @click="notComplete">
          <img :src="item.img" alt="">
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="home-page" :class="pageShow === 'main' ? 'active' : ''" @click="$emit('select-home')">
      <img src="../../assets/img/homePage.png" alt="">
      <span>首页</span>
    </div>
    <div class="themes" :class="pageShow === 'theme' && activeTheme.id === theme.id ? 'active' : ''" v-for="(theme, index) in themes" :key="index" @click="$emit('select-theme', theme)">
      <span>{{theme.name}}</span>
      <img v-if="themeIsSubscribed(theme.name)" class="right-arrow" src="../../assets/img/left_arrow.png" alt="">
      <img v-else src="../../assets/img/plus.png" alt="" @click.stop="subscribeTheme(theme.name)">
    </div>
  </div>
</template>

<script>
// 这里在data中设置图片路径时要注意哦，一定要使用import将图片引入，不可以将路径写在data中，否则url-loader将不会解析
import star from '@/assets/img/star.png'
import download from '@/assets/img/download.png'
import { mapActions, mapState, mapMutations } from 'vuex'
import image403 from '@/utils/image403'
export default {
  data () {
    return {
      twoItems: [
        {
          title: '我的收藏',
          img: star
        },
        {
          title: '离线下载',
          img: download
        }
      ]
    }
  },
  props: {
    pageShow: String,
    activeTheme: Object
  },
  computed: {
    ...mapState(['themes', 'themeSubscribed'])
  },
  mounted () {
    this.GETTHEMESUBSCRIBED()
    this.getThemes()
  },
  methods: {
    ...mapMutations(['GETTHEMESUBSCRIBED', 'ADDTHEMESUBSCRIBED']),
    ...mapActions(['getThemes']),
    image403,
    notComplete () {
      this.$toast({
        message: '假的！点了没用那种，气不气(～￣▽￣)～ ',
        duration: 200
      })
    },
    // 点击侧边栏各个主题日报的加号订阅该主题日报，传入日报名称
    subscribeTheme (themeName) {
      this.ADDTHEMESUBSCRIBED(themeName)
      this.$toast({
        message: '已关注',
        duration: 1000
      })
    },
    // 计算显示的某一项主题日报是否已经被订阅。包含的话表示已订阅，返回true
    themeIsSubscribed (themeName) {
      return this.themeSubscribed.indexOf(themeName) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 634px;
  height: 100%;
  font-size: 34px;
  overflow: scroll;
  .header {
    height: 228px;
    background: #00a2ed;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
      height: 110px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      .avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-right: 26px;
      }
    }
    .content {
      height: 110px;
      display: flex;
      align-items: center;
      padding-left: 50px;
      .item {
        &:last-of-type {
          margin-left: 80px;
        }
        img {
          width: 32px;
          height: 32px;
          margin-right: 40px;
        }
        span {
          font-weight: bold;
        }
      }
    }
  }
  .home-page {
    height: 103px;
    padding-left: 45px;
    display: flex;
    align-items: center;
    &.active {
      background: #f0f0f0;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 33px;
    }
    span {
      color: #00a2ed;
    }
  }
  .themes {
    height: 104px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 112px 0 39px;
    &.active {
      background: #f0f0f0;
    }
    img {
      width: 28px;
      height: 28px;
    }
    .right-arrow {
      transform: rotate(180deg);
    }
  }
}
</style>
