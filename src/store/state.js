export default {
  topStories: [], // swiper中需要用到的
  todayHotStories: [], // 今日要闻
  date: '', // 当前日期，格式‘20180819’，表示2018-08-19
  beforeStories: [], // 今天之前的新闻
  themes: [], // 主题日报列表(就是主页侧边栏的那个列表)
  theme: {}, // 主题日报内容，包含一些信息，其中stories是一个数组，表示该主题日报下的文章列表。一次只加载一定条数，需要做上拉加载的动作。获取过往文章需要通过最后一条story的id去查询(看接口)，所以需要在这个对象中添加一个beforeStoryId字段记录这个信息
  themeSubscribed: [] // 订阅的主题日报，只保存主题日报的name，并且需要将这个state保存到localStorage中
}
