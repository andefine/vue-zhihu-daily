<template>
  <div class="header">
    <div class="left">
      <img class="menu" src="../../assets/img/menu.png" alt="" v-on:click="tapMenu">
      <slot name="title"></slot>
    </div>
    <div class="right">
      <slot name="bell"></slot>
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tapMenu () {
      this.$emit('tap-menu')
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
  font-size: 40px;
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
  }
}
</style>
