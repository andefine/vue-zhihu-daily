<template>
  <div class="home-page">
    <Header></Header>
    <Swiper></Swiper>
    <div class="today-hot">
      <h3 class="title">今日要闻</h3>
      <news-item class="item" v-for="(story, index) in todayHotStories" :key="index" :story="story"></news-item>
    </div>
    <div class="news-before" v-for="(item, outIndex) in beforeStories" :key="outIndex">
      <h3 class="title">{{item.date}}</h3>
      <news-item class="item" v-for="(story, innerIndx) in item.stories" :key="innerIndx" :story="story"></news-item>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapActions(['getNewsLatest', 'getBefore'])
  },
  mounted () {
    this.getNewsLatest().then(() => {
      this.getBefore()
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
