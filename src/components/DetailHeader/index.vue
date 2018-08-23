<template>
  <div class="header">
    <div class="left">
      <img class="back" src="../../assets/img/back.png" alt="">
    </div>
    <div class="right">
      <img class="item" src="../../assets/img/share.png" alt="">
      <img class="item" src="../../assets/img/star.png" alt="">
      <div class="comment item">
        <img src="../../assets/img/comment.png" alt="">
        <span>{{storyExtra.comments}}</span>
      </div>
      <div class="thumb-up item">
        <img src="../../assets/img/thumb_up.png" alt="">
        <span>{{storyExtra.popularity}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      storyExtra: {}
    }
  },
  props: {
    storyId: Number
  },
  mounted () {
    this.getStoryExtra()
  },
  methods: {
    getStoryExtra () {
      return axios.get(`/api/4/story-extra/${this.storyId}`).then((res) => {
        if (res.status === 200) {
          this.storyExtra = res.data
        }
      })
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
    }
  }
}
</style>
