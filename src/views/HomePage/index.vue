<template>
  <div class="home-page">
    <Header class="header" v-on:tap-menu="toggleSidebar">
      <span slot="title">{{title}}</span>
      <img slot="bell" src="../../assets/img/bell.png" alt="">
      <img slot="right-icon" class="more" src="../../assets/img/more.png" alt="">
    </Header>
    <div class="wrapper" ref="wrapper">
      <div class="content">

        <!-- 首页 -->
        <div class="main-page" v-show="pageShow === 'main'">
          <Swiper></Swiper>
          <div class="today-hot">
            <div class="title">
              <span>今日要闻</span>
            </div>
            <news-item class="item" v-for="(story, index) in todayHotStories" :key="index" :story="story" @click-to="toNewsDetail(story.id)"></news-item>
          </div>
          <div class="news-before" v-for="(item, outIndex) in beforeStories" :key="outIndex">
            <div class="title">
              <span>{{dateFormat(item.date)}}</span>
            </div>
            <news-item class="item" v-for="(story, innerIndx) in item.stories" :key="innerIndx" :story="story" @click-to="toNewsDetail(story.id)"></news-item>
          </div>
        </div>

        <!-- 主题日报页 -->
        <div class="theme-page" v-show="pageShow === 'theme'">
          <div class="top">
            <img class="bg-img" :src="image403(theme.background)" alt="">
            <span class="des">{{theme.description}}</span>
          </div>
          <div class="editors">
            <span class="editBy">主编</span>
            <img class="editor-avatar" :src="image403(editor.avatar)" alt="" v-for="(editor, index) in theme.editors" :key="index">
          </div>
          <news-item class="item" v-for="(story, innerIndx) in theme.stories" :key="innerIndx" :story="story" @click-to="toNewsDetail(story.id)"></news-item>
        </div>

      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-show="sidebarIsShow" @click="toggleSidebar">
        <transition name="slide">
          <sidebar-menu class="sidebar-menu" v-show="sidebarIsShow" @select-theme="toTheme"></sidebar-menu>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
import moment from 'moment'
import image403 from '@/utils/image403'
export default {
  data () {
    return {
      sidebarIsShow: false, // 控制侧边栏是否显示
      title: '首页', // 头部标题
      // mainPage表示首页，包含swiper、今日热闻、过往新闻
      pageShow: 'main' // 显示的内容，'main'表示首页(包含swiper、今日热闻、过往新闻)，'theme'表示主题日报页
    }
  },
  computed: {
    ...mapState(['todayHotStories', 'beforeStories', 'theme'])
  },
  components: {
    Header: () => import('@/components/Header'),
    Swiper: () => import('@/components/Swiper'),
    NewsItem: () => import('@/components/NewsItem'),
    SidebarMenu: () => import('@/components/SidebarMenu')
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapMutations(['CLEARHOMEPAGE']),
    ...mapActions(['getNewsLatest', 'getBefore', 'getThemeContent']),
    image403,
    // 将yyyymmdd格式的日期数字字符串转成想要的日期字符串，20180820 -> 08月20日 星期x
    dateFormat (dateString) {
      let day = ''
      switch (moment(dateString).format('e')) {
        case '0':
          day = '日'
          break
        case '1':
          day = '一'
          break
        case '2':
          day = '二'
          break
        case '3':
          day = '三'
          break
        case '4':
          day = '四'
          break
        case '5':
          day = '五'
          break
        case '6':
          day = '六'
          break

        default:
          break
      }
      return moment(dateString).format('MM月DD日') + ' 星期' + day
    },
    toggleSidebar () {
      this.sidebarIsShow = !this.sidebarIsShow
    },
    loadData () {
      if (!this.scroll) {
        this.getNewsLatest().then(res => {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {
              click: true
            })
            // 上拉加载
            this.scroll.on('scrollEnd', (pos) => {
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                this.getBefore().then(res => {
                  this.$nextTick(() => {
                    this.scroll.refresh()
                  })
                })
              }
            })
            // 下拉刷新
            this.scroll.on('touchEnd', (pos) => {
              if (pos.y > 50) {
                this.CLEARHOMEPAGE()
                this.getNewsLatest().then(() => {
                  this.$nextTick(() => {
                    this.scroll.refresh()
                  })
                })
              }
            })
          })
        })
      } else {
        this.getBefore().then(res => {
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        })
      }
    },
    // 跳转到新闻详情页
    toNewsDetail (id) {
      this.$router.push({ path: `newsDetail/${id}` })
    },
    // 点击不同主题日报显示不同主题日报内容，themeId是SidebarMenu暴露的方法的参数
    toTheme (themeId) {
      this.sidebarIsShow = false
      this.getThemeContent(themeId).then(() => {
        this.pageShow = 'theme'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  background: #f3f3f3;
  overflow: scroll;
  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
    .more {
      margin: 0 30px 0 50px;
    }
  }
  .wrapper {
    height: 100%;
    .content {
      padding-top: 112px;
    }
  }
  .main-page {
    .today-hot, .news-before {
      .title {
        height: 108px;
        display: flex;
        align-items: center;
        padding: 0 30px;
        font-size: 28px;
        font-weight: normal;
        color: #4d4d4d;
      }
      .item {
        margin: 0 auto 17px;
      }
    }
  }
  .theme-page {
    .top {
      height: 470px;
      position: relative;
      overflow: hidden;
      background: #4d4d4d;
      .bg-img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .des {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 55px;
        color: #fffffc;
        padding: 0 34px;
        font-size: 36px;
        line-height: 44px;
      }
    }
    .editors {
      height: 108px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      font-size: 28px;
      font-weight: normal;
      color: #4d4d4d;
      .editBy {
        margin-right: 34px;
      }
      .editor-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 24px;
      }
    }
    .item {
      margin: 0 auto 17px;
    }
  }
  .mask {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    .sidebar-menu {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-to {
    background: rgba(0, 0, 0, 0);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-100%);
  }
}
</style>
