<template>
  <div class="comment-card">
    <div class="avatar">
      <img :src="image403(comment.avatar)" alt="">
    </div>
    <div class="main">
      <div class="author">{{comment.author}}</div>
      <div class="text">{{comment.content}}</div>
      <div class="reply" v-if="comment.reply_to">
        <span class="reply-author">//{{comment.reply_to.author}}:</span>
        {{comment.reply_to.content}}
      </div>
      <div class="time">{{formatTime(comment.time)}}</div>
    </div>
    <div class="thumb-up">
      <img src="../../assets/img/thumb_up_gray.png" alt="">
      <span>{{comment.likes}}</span>
    </div>
  </div>
</template>

<script>
import image403 from '@/utils/image403'
import moment from 'moment'
export default {
  props: {
    comment: Object
  },
  methods: {
    image403,
    formatTime (timeStamp) {
      return moment(timeStamp).format('MM-DD HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-card {
  display: flex;
  padding: 30px 60px 30px 30px;
  font-size: 40px;
  line-height: 55px;
  position: relative;
  .avatar {
    width: 74px;
    margin-right: 10px;
    img {
      width: 74px;
      height: 74rpx;
      border-radius: 50%;
    }
  }
  .main {
    flex-grow: 1;
    width: 1px; // 这里宽度随便给一个，否则下面使用white-space会出问题
    .author {
      font-weight: bold;
      margin-bottom: 20px;
    }
    .reply {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .reply-author {
        font-weight: bold;
      }
    }
    .time {
      font-size: 30px;
      color: #afafaf;
      margin-top: 40px;
    }
  }
  .thumb-up {
    position: absolute;
    right: 30px;
    top: 34px;
    font-size: 30px;
    line-height: 30px;
    color: #b8b8b8;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
