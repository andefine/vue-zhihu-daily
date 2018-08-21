<template>
  <div class="home-page" ref="wrapper">
    <div>
      <Header></Header>
      <Swiper></Swiper>
      <div class="today-hot">
        <h3 class="title">今日要闻</h3>
        <news-item class="item" v-for="(story, index) in todayHotStories" :key="index" :story="story"></news-item>
      </div>
      <div class="news-before" v-for="(item, outIndex) in beforeStories" :key="outIndex">
        <h3 class="title">{{dateFormat(item.date)}}</h3>
        <news-item class="item" v-for="(story, innerIndx) in item.stories" :key="innerIndx" :story="story"></news-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll'
import moment from 'moment'
export default {
  computed: {
    ...mapState(['todayHotStories', 'beforeStories'])
  },
  components: {
    Header: () => import('@/components/Header'),
    Swiper: () => import('@/components/Swiper'),
    NewsItem: () => import('@/components/NewsItem')
  },
  methods: {
    ...mapActions(['getNewsLatest', 'getBefore']),
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
    }
  },
  created () {
    this.getNewsLatest().then((res) => {
      // this.getBefore()
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            pullUpLoad: {
              threshhold: 50
            }
          })
          this.scroll.on('pullingUp', (pos) => {
            this.getBefore().then(() => {
              this.scroll.finishPullUp()
            })
          })
        } else {
          this.scroll.refresh()
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  background: #f3f3f3;
  overflow: scroll;
  .today-hot, .news-before {
    padding-top: 35px;
    .title {
      font-size: 28px;
      font-weight: normal;
      color: #4d4d4d;
      line-height: 28px;
      margin: 0 0 44px 34px;
    }
    .item {
      margin: 0 auto 17px;
    }
  }
}
</style>
