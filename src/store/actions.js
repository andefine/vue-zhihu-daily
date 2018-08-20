import axios from 'axios'

export default {
  // 获取最新消息
  getNewsLatest ({ commit }) {
    return axios.get('/api/4/news/latest').then(res => {
      if (res.status === 200) {
        commit('SETTOPSTORIES', res.data.top_stories)
        commit('SETTODAYHOTSTORIES', res.data.stories)
        commit('SETDATE', res.data.date)
      }
    })
  },
  getBefore ({ state, commit }) {
    let date = ''
    // 如果没有数据，则使用全局的date日期
    if (state.beforeStories.length === 0) {
      date = state.date
    } else {
      date = state.beforeStories[state.beforeStories.length - 1].date
    }

    return axios.get('/api/4/news/before/' + date).then(res => {
      if (res.status === 200) {
        commit('ADDSTORIES', res.data)
      }
    })
  }
}
