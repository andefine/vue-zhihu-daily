export default {
  // 设置topStories
  SETTOPSTORIES (state, data) {
    state.topStories = data
  },
  // 设置todayHotStories
  SETTODAYHOTSTORIES (state, data) {
    state.todayHotStories = data
  },
  // 设置时间，格式为'20180819'这样，表示2018-08-19
  SETDATE (state, data) {
    state.date = data
  },
  // 获取之前的新闻
  ADDSTORIES (state, data) {
    state.beforeStories.push(data)
  }
}
