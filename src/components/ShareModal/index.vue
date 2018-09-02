<template>
  <div class="share-modal" @click.stop>
    <div class="header">
      <span>分享</span>
    </div>
    <div class="share-content">
      <div class="item" v-for="(item, index) in shareItems" :key="index" @click="notComplete">
        <img class="icon" :src="item.img" alt="">
        <span class="name">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import weibo from '@/assets/img/sina_weibo.png'
import wechat from '@/assets/img/wechat.png'
import friendCircle from '@/assets/img/friend_circle.png'
import yinxiang from '@/assets/img/yinxiang.png'
import youdaoyun from '@/assets/img/youdaoyun.png'
import qq from '@/assets/img/QQ.png'
import morePlat from '@/assets/img/more_plat.png'
export default {
  data () {
    return {
      shareItems: [
        {
          name: '新浪微博',
          img: weibo
        },
        {
          name: '微信',
          img: wechat
        },
        {
          name: '微信朋友圈',
          img: friendCircle
        },
        {
          name: '印象笔记',
          img: yinxiang
        },
        {
          name: '有道云笔记',
          img: youdaoyun
        },
        {
          name: 'QQ',
          img: qq
        },
        {
          name: '更多平台',
          img: morePlat
        }
      ]
    }
  },
  methods: {
    notComplete () {
      this.$toast({
        message: '你觉得我会做这个功能吗？不可能不存在别想了',
        duration: 200
      })
    }
  }
}
</script>

<style lang="scss">
.share-modal {
  width: 646px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 10px #000;
  .header {
    height: 128px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    font-size: 40px;
    font-weight: bold;
  }
  .share-content {
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 200px;
      width: 33.3%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      line-height: 26px;
      color: #606060;
      .icon {
        width: 114px;
        height: 114px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
