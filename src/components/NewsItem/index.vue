<template>
  <div class="news-item" @click="$emit('click-to')">
    <span class="title">{{story.title}}</span>
    <div class="right" v-if="story.images">
      <img class="img" v-lazy="image403(story.images[0])" alt="">
      <div class="corner" v-if="story.multipic">
        <img class="mutiple" src="../../assets/img/images_icon.png" alt="">
        <span>多图</span>
      </div>
    </div>
  </div>
</template>

<script>
import image403 from '@/utils/image403'
export default {
  props: {
    story: Object
  },
  methods: {
    image403
  }
}
</script>

<style lang="scss" scoped>
  .news-item {
    width: 716px;
    // height: 203px;
    min-height: 150px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 10px 0 #ddd;
    padding: 24px 34px 28px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 34px;
      line-height: 44px;
    }
    .right {
      width: 170px;
      height: 150px;
      margin-left: 28px;
      position: relative;
      .img {
        width: 170px;
        height: 150px;
      }
      .corner {
        width: 88px;
        height: 38px;
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        padding: 0 6px;
        .mutiple {
          width: 22px;
          height: 22px;
        }
        span {
          font-size: 22px;
          color: #fff;
        }
      }
    }
  }
</style>
