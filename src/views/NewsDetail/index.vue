<template>
  <div class="news-detail">
    <link rel="stylesheet" :href="story.css">
    <div class="my-body" v-html="image403(story.body)"></div>
  </div>
</template>

<script>
import axios from 'axios'
import image403 from '../../utils/image403'
export default {
  data () {
    return {
      story: {}
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    image403,
    getNews () {
      return axios.get(`/api/4/news/${this.$route.params.id}`).then(res => {
        if (res.status === 200) {
          this.story = res.data
        }
      })
    }
  }
}
</script>

<style>

</style>
