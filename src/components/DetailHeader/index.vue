<template>
  <div class="header" v-if="storyExtra">
    <div class="left" @click="back">
      <img class="back" src="../../assets/img/back.png" alt="">
    </div>
    <div class="right">
      <img class="item" src="../../assets/img/share.png" alt="" @click="$emit('show-share')">
      <img class="item" src="../../assets/img/star.png" alt="" @click="$emit('collect')">
      <div class="comment item" @click="$emit('to-comment')">
        <img src="../../assets/img/comment.png" alt="">
        <span class="num">{{numFilter(storyExtra.comments)}}</span>
      </div>
      <div class="thumb-up item" @click="$emit('thumb-up')">
        <img src="../../assets/img/thumb_up.png" alt="">
        <span class="num">{{numFilter(storyExtra.popularity)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    storyExtra: Object
  },
  methods: {
    back () {
      this.$router.back()
    },
    // 数字过千后用用k表示
    numFilter (num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + ' k'
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 112px;
  background: #00a2ed;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  img {
    width: 50px;
  }
  .right {
    display: flex;
    align-items: center;
    .item {
      margin-right: 50px;
      &:last-child {
        margin-right: 0;
      }
      .num {
        font-size: 30px;
      }
    }
  }
}
</style>
