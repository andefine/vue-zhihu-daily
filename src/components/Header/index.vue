<template>
  <div class="header">
    <div class="left">
      <img class="menu" src="../../assets/img/menu.png" alt="">
      <span class="title">首页</span>
    </div>
    <div class="right">
      <img src="../../assets/img/bell.png" alt="">
      <img class="more" src="../../assets/img/more.png" alt="">
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
  img {
    width: 40px;
    height: 40px;
  }
  .left, .right {
    display: flex;
    align-items: center;
  }
  .left {
    .menu {
      margin: 0 70px 0 40px;
    }
    .title {
      font-size: 36px;
    }
  }
  .right {
    .more {
      margin: 0 30px 0 50px;
    }
  }
}
</style>
