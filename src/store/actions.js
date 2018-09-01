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
  // 获取过往新闻
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
  },
  // 获取主题日报列表
  getThemes ({ commit }) {
    return axios.get('/api/4/themes').then((res) => {
      if (res.status === 200) {
        commit('SETTHEMES', res.data.others)
      }
    })
  },
  // 根据主题日报id获取主题日报内容
  getThemeContent ({ commit }, id) {
    return axios.get(`/api/4/theme/${id}`).then((res) => {
      if (res.status === 200) {
        commit('SETTHEME', res.data)
      }
    })
  }
}
