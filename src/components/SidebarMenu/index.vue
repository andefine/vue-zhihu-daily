<template>
  <div class="sidebar" @click.stop.prevent>
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
    <div class="home-page">
      <img src="../../assets/img/homePage.png" alt="">
      <span>首页</span>
    </div>
    <div class="themes" v-for="(theme, index) in themes" :key="index" @click="toThemePage(theme.id)">
      <span>{{theme.name}}</span>
      <img src="../../assets/img/plus.png" alt="">
    </div>
  </div>
</template>

<script>
// 这里在data中设置图片路径时要注意哦，一定要使用import将图片引入，不可以将路径写在data中，否则url-loader将不会解析
import star from '@/assets/img/star.png'
import download from '@/assets/img/download.png'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      twoItems: [
        {
          title: '我的收藏',
          img: star
        },
        {
          title: '离线下载',
          img: download
        }
      ]
    }
  },
  computed: {
    ...mapState(['themes'])
  },
  mounted () {
    this.getThemes()
  },
  methods: {
    ...mapActions(['getThemes']),
    // 点击每个主题日报跳转到主题日报页
    toThemePage (id) {
      this.$router.push({ path: `/themePage/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  width: 634px;
  height: 100%;
  font-size: 34px;
  overflow: scroll;
  .header {
    height: 228px;
    background: #00a2ed;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
      height: 110px;
      display: flex;
      align-items: center;
      padding-left: 30px;
      .avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-right: 26px;
      }
    }
    .content {
      height: 110px;
      display: flex;
      align-items: center;
      padding-left: 50px;
      .item {
        &:last-of-type {
          margin-left: 80px;
        }
        img {
          width: 32px;
          height: 32px;
          margin-right: 40px;
        }
        span {
          font-weight: bold;
        }
      }
    }
  }
  .home-page {
    height: 103px;
    padding-left: 45px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 33px;
    }
    span {
      color: #00a2ed;
    }
  }
  .themes {
    height: 104px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 112px 0 39px;
    img {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
