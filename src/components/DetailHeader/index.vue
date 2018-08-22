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
        <span>12</span>
      </div>
      <div class="thumb-up item">
        <img src="../../assets/img/thumb_up.png" alt="">
        <span>22</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
