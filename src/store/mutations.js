export default {
  // 设置themes
  SETTHEMES (state, data) {
    state.themes = data
  },
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
  // 添加之前的新闻
  ADDSTORIES (state, data) {
    state.beforeStories.push(data)
  },
  // 清空之前的新闻
  CLEARHOMEPAGE (state) {
    state.beforeStories = []
  },
  // 设置主题日报内容
  SETTHEME (state, data) {
    state.theme = data
  },
  // 添加主题日报内容
  ADDTHEME (state, data) {
    state.theme.stories = state.theme.stories.concat(data)
  }
}
