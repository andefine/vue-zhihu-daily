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
  },
  // 从本地存储中取得themeSubscribed
  GETTHEMESUBSCRIBED (state) {
    if (localStorage.getItem('themeSubscribed')) {
      state.themeSubscribed = JSON.parse(localStorage.getItem('themeSubscribed'))
    }
  },
  // 订阅某个主题日报时，直接往数组塞一个值
  ADDTHEMESUBSCRIBED (state, themeName) {
    state.themeSubscribed.push(themeName)
    localStorage.setItem('themeSubscribed', JSON.stringify(state.themeSubscribed)) // 并且同步设置到本地存储当中
  },
  // 取消订阅该主题日报时，找到数组该值，并移除
  REMOVETHEMESUBSCRIBED (state, themeName) {
    let index = state.themeSubscribed.indexOf(themeName)
    state.themeSubscribed.splice(index, 1)
    localStorage.setItem('themeSubscribed', JSON.stringify(state.themeSubscribed))
  }
}
