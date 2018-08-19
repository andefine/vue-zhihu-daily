export default {
  // 设置topStories
  SETTOPSTORIES (state, data) {
    state.topStories = data.top_stories
  },
  // 设置todayHotStories
  SETTODAYHOTSTORIES (state, data) {
    state.todayHotStories = data.stories
  }
}
