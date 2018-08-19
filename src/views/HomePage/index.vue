<template>
  <div class="home-page">
    <Header></Header>
    <Swiper></Swiper>
    <div class="today-hot">
      <h3 class="title">今日要闻</h3>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
      <news-item class="item"></news-item>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {
    Header: () => import('@/components/Header'),
    Swiper: () => import('@/components/Swiper'),
    NewsItem: () => import('@/components/NewsItem')
  },
  methods: {
    ...mapActions(['getNewsLatest'])
  },
  mounted () {
    this.getNewsLatest()
    console.log(1)
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  background: #f3f3f3;
  overflow: scroll;
  .today-hot {
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
