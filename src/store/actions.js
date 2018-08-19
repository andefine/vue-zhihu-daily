import axios from 'axios'

export default {
  getNewsLatest ({ commit }) {
    return axios.get('/api/4/news/latest').then(res => {
      if (res.status === 200) {
        commit('SETTOPSTORIES', res.data)
        commit('SETTODAYHOTSTORIES', res.data)
      }
    })
  }
}
