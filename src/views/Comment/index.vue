<template>
  <div class="comment">
    <div class="header">
      <div class="left">
        <img class="back" src="../../assets/img/back.png" alt="">
        <span class="title">{{storyExtra.comments}}条点评</span>
      </div>
      <div class="right">
        <img class="write" src="../../assets/img/write.png" alt="">
      </div>
    </div>
    <div class="long-comment">
      <div class="top">
        <span>{{storyExtra.long_comments}}条长评</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      storyExtra: {}, // 新闻额外信息
      longComments: {}, // 新闻对应长评论
      shortComments: {} // 新闻对应短评论
    }
  },
  computed: {
    storyId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getStoryExtra(this.storyId)
    this.getLongComments(this.storyId)
    this.getShortComments(this.storyId)
  },
  methods: {
    // 获取新闻额外信息
    getStoryExtra (id) {
      return axios.get(`/api/4/story-extra/${id}`).then((res) => {
        if (res.status === 200) {
          this.storyExtra = res.data
        }
      })
    },
    /**
     * 获取新闻对应长评论
     * id: 新闻id
     */
    getLongComments (id) {
      return axios.get(`/api/4/story/${id}/long-comments`).then((res) => {
        if (res.status === 200) {
          this.longComments = res.data
        }
      })
    },
    /**
     * 获取新闻对应短评论
     * id: 新闻id
     */
    getShortComments (id) {
      return axios.get(`/api/4/story/${this.storyId}/short-comments`).then((res) => {
        if (res.status === 200) {
          this.shortComments = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  height: 100%;
  .header {
    height: 112px;
    background: #00a2ed;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-size: 40px;
    img {
      width: 50px;
    }
    .back {
      margin-right: 60px;
    }
    .write {
      width: 60px;
    }
  }
  .long-comment {
    .top {
      height: 100px;
      font-size: 30px;
      line-height: 30px;
      padding-left: 30px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
