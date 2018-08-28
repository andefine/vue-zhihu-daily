<template>
  <div class="sidebar" @click.stop="myClick">
    <div class="header">
      <div class="user">
        <img class="avatar" src="../../assets/img/default_avatar.png" alt="">
        <span class="name">请登录</span>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in twoItems" :key="index">
          <img :src="item.img" alt="">
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      twoItems: [
        {
          title: '我的收藏',
          img: '../../assets/img/star.png'
        },
        {
          title: '离线下载',
          img: '../../assets/img/download.png'
        }
      ]
    }
  },
  methods: {
    myClick () {
      this.$emit('my-click')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 634px;
  height: 100%;
  .header {
    height: 228px;
    background: #00a2ed;
  }
}
</style>
