<template>
  <div class="home-page">
    <Header class="header" v-on:tap-menu="toggleSidebar">
      <span slot="title">{{title}}</span>
      <template v-if="pageShow === 'main'">
        <img slot="bell" src="../../assets/img/bell.png" alt="" @click="notComplete">
        <img slot="right-icon" class="more" src="../../assets/img/more.png" alt="" @click="toggleMore">
      </template>
      <template v-if="pageShow === 'theme'">
        <img v-if="themeIsSubscribed(activeTheme.name)" slot="right-icon" class="subtract" src="../../assets/img/subtract.png" alt="" @click="unsubscribeTheme(activeTheme.name)">
        <img v-else slot="right-icon" class="plus" src="../../assets/img/circle_plus.png" alt="" @click="subscribeTheme(activeTheme.name)">
      </template>
    </Header>

    <!-- 滚动区域 -->
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

    <!-- 侧边栏 -->
    <transition name="fade">
      <div class="mask" v-show="sidebarIsShow" @click="toggleSidebar">
        <transition name="slide">
          <sidebar-menu class="sidebar-menu" v-show="sidebarIsShow"    @select-theme="toTheme" @select-home="toHomePage" :page-show="pageShow" :active-theme="activeTheme"></sidebar-menu>
        </transition>
      </div>
    </transition>

    <div class="more-mask" v-show="moreIsShow" @click="toggleMore">
      <div class="more-block" @click.stop="notComplete02">
        <div class="more-item">
          <span>夜间模式</span>
        </div>
        <div class="more-item">
          <span>设置选项</span>
        </div>
      </div>
    </div>

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
      moreIsShow: false, // 点击头部右上角三点是否显示更多
      title: '首页', // 头部标题
      // mainPage表示首页，包含swiper、今日热闻、过往新闻
      pageShow: 'main', // 显示的内容，'main'表示首页(包含swiper、今日热闻、过往新闻)，'theme'表示主题日报页
      activeTheme: {}, // 被选中的主题日报
      isFirstEnter: false // 是否第一次进入
    }
  },
  computed: {
    ...mapState(['todayHotStories', 'beforeStories', 'themes', 'theme', 'themeSubscribed'])
  },
  components: {
    Header: () => import('@/components/Header'),
    Swiper: () => import('@/components/Swiper'),
    NewsItem: () => import('@/components/NewsItem'),
    SidebarMenu: () => import('@/components/SidebarMenu')
  },
  created () {
    this.isFirstEnter = true // 只有第一次进入或者刷新页面后才会执行此钩子函数，使用keep-alive(2+次)进入不会执行此钩子函数
  },
  beforeRouteEnter (to, from, next) {
    // 如果是从新闻详情页跳转过来的，说明是返回
    if (from.name === 'newsDetail') {
      to.meta.isBack = true
    }
    next()
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明不是从NewsDetail返回的，需要重新获取数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需要重新获取数据
      this.loadData()
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
  },
  methods: {
    ...mapMutations(['CLEARHOMEPAGE', 'ADDTHEMESUBSCRIBED', 'REMOVETHEMESUBSCRIBED']),
    ...mapActions(['getNewsLatest', 'getBefore', 'getThemeContent', 'addThemeContent']),
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
    toggleMore () {
      this.moreIsShow = !this.moreIsShow
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
                // 如果是首页的话继续加载首页的内容，如果是其他主题日报，需要加载其他的主题日报的内容
                if (this.pageShow === 'main') {
                  this.getBefore().then(res => {
                    this.$nextTick(() => {
                      this.scroll.refresh()
                    })
                  })
                } else if (this.pageShow === 'theme') {
                  this.addThemeContent(this.activeTheme.id).then(res => {
                    this.$nextTick(() => {
                      this.scroll.refresh()
                    })
                  })
                }
              }
            })
            // 下拉刷新
            this.scroll.on('touchEnd', (pos) => {
              if (pos.y > 50) {
                if (this.pageShow === 'main') {
                  this.CLEARHOMEPAGE()
                  this.getNewsLatest().then(() => {
                    this.$nextTick(() => {
                      this.scroll.refresh()
                    })
                  })
                } else if (this.pageShow === 'theme') {
                  this.getThemeContent(this.activeTheme.id).then(() => {
                    this.$nextTick(() => {
                      this.scroll.refresh()
                    })
                  })
                }
              }
            })
          })
        })
      }
    },
    // 跳转到新闻详情页
    toNewsDetail (id) {
      this.$router.push({ path: `newsDetail/${id}` })
    },
    // 点击不同主题日报显示不同主题日报内容，themeId是SidebarMenu暴露的方法的参数
    toTheme (theme) {
      this.activeTheme = theme
      this.sidebarIsShow = false
      this.getThemeContent(theme.id).then((res) => {
        this.title = theme.name
        this.pageShow = 'theme'
        this.scroll.scrollTo(0, 0, 0)
      })
    },
    // 点击侧边栏的首页
    toHomePage () {
      this.sidebarIsShow = false
      this.pageShow = 'main'
      this.title = '首页'
      this.scroll.scrollTo(0, 0, 0)
    },
    notComplete () {
      this.$toast({
        message: '假的！点了没用那种，气不气(～￣▽￣)～',
        duration: 200
      })
    },
    notComplete02 () {
      this.$toast({
        message: '你觉得我会做这个功能吗？哼，不可能',
        duration: 200
      })
    },
    // 根据主题日报名判断是否在已订阅的主题日报列表中
    themeIsSubscribed (themeName) {
      return this.themeSubscribed.indexOf(themeName) > -1
    },
    // 订阅某主题日报
    subscribeTheme (themeName) {
      this.ADDTHEMESUBSCRIBED(themeName)
      this.$toast({
        message: '已关注',
        duration: 1000
      })
    },
    // 取消订阅某主题日报
    unsubscribeTheme (themeName) {
      this.REMOVETHEMESUBSCRIBED(themeName)
      this.$toast({
        message: '已取消关注',
        duration: 1000
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
    .more, .plus, .subtract {
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
  .more-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .more-block {
      width: 408px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 5px;
      right: 8px;
      font-size: 34px;
      box-shadow: 0 1px 10px #000;
      .more-item {
        height: 100px;
        padding: 0 32px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
