# vue-zhihu-daily

使用vue开发的一款知乎日报，样式主要参考安卓版知乎日报(版本号2.6.6)。这个项目比较适合初学者参考学习，大神可以指点指点

一直在学习vue，看文档、看博客、写小例子，但是仔细想想还是需要一个项目来加强对vue的掌握程度。项目不是很庞大，非常适合用来练习和检验，而且有大神分析好的API，不用为获取数据烦恼(￣▽￣)~*

项目中基本功能差不多都已实现，一些没有接口或其他地方并没有实现。整个项目中肯定是存在着问题的，你可以自己修复bug或者告知我，，嗯，就这样

## 声明
本项目所有文字图片等稿件内容均由[知乎](https://www.zhihu.com/)提供，获取与共享之行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。请您了解相关情况，并遵守知乎协议。

## 致谢
> [cccyb](https://github.com/cccyb) 的 [vue-zhihu-daily](https://github.com/cccyb/vue-zhihu-daily)

> [izzyleung](https://github.com/izzyleung) 整理的 [知乎日报 API 分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

## Build Setup(vue-cli模板中的，不改了，懒)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
建议使用chrome的手机调试模式打开

## 技术栈
* vue-cli脚手架，用来创建项目结构，基本配置它都已经帮我们搞定，一些额外需求另行配置即可
* vue+vue-router+vuex 全家桶当然一个都少不了
* 项目中使用了不少插件：lib-flexible(适配移动端)、vue-awesome-swiper(轮播图)、better-scroll(滚动插件)、axios(尤大亲自推荐的哟)、moment(格式化时间)、mint-ui(其实我就用了一个toast组件0.0)

## 截图
![](./screenshots/index.gif)
![](./screenshots/sidebar.gif)
![](./screenshots/news_detail.gif)

## 记录下的一些知识点(有些没记下那就是忘了==)

1. ### 使用vue-cli创建项目
几个test不要，其他统统默认

2. ### 使用lib-flexible适配移动端
官方已经建议lib-flexible这个方案可以放弃使用(但我就是想用一哈)，详细可前往这篇文章：[使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)。<br>
当前推荐的是用viewport来代替此方案，如果你想用，可以慢慢咀嚼这两篇文章：[再聊移动端页面的适配](https://www.w3cplus.com/css/vw-for-layout.html) 和 [如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

扯远了，，还是看这个项目中怎么用的吧。lib-flexible安装完之后在main.js中引入，此时就可以使用rem单位了。然后安装px2rem-loader，这样才可以直接写px单位，安装完需要在build/utils中配置一下，其中有一个cssLoaders的方法，在里面添加一个变量，如下：
```
const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75,
    remPrecision: 8
  }
}
```
并且在generateLoaders的函数中，修改一下原来的loaders变量
```
const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader, px2remLoader]
```

3. ### 在style中可以直接写scss
这个问题一开始磨了挺久，其实贼简单，安装node-sass,sass-loader这两个依赖就啥事没有了。文档有说明：[Pre-Processors](https://vuejs-templates.github.io/webpack/pre-processors.html)

4. ### 配置开发时的api代理，实现跨域，修改config/index.js，找到proxyTable，修改：
```
proxyTable: {
  '/api': {
    target: 'https://news-at.zhihu.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }
}
```

* 参考[使用vue-cli+axios配置代理进行跨域访问数据](https://blog.csdn.net/it_cgq/article/details/78781422)<br>
* vue-cli的template文档中也有说明[API Proxying During Development](https://vuejs-templates.github.io/webpack/proxy.html)

5. ### 使用axios获取的图片url直接放在img的src属性中，出现403的错误
解决方法[【前端】解决访问api图片403禁止访问问题](https://segmentfault.com/a/1190000011628835)

6. ### vue-awesome-swiper使用v-for渲染数据时，设置loop:true无效
解决方法：在父元素中添加v-if="xxx.length > 0"。答案在此[{ loop: true } swiper-slide goes wrong when data is from v-for](https://github.com/surmon-china/vue-awesome-swiper/issues/322)

7. ### 返回不刷新，前进刷新的方案
预实现返回不刷新，所以使用了\<keep-alive\>。此时返回的确是不刷新了，但是出现了一个新问题，当路由参数改变时，前进也不会刷新= =。(可以先去看一下[Vue Router官方文档](https://router.vuejs.org/)中Dynamic Route Matching下的Reacting to Params Changes和Navigation Guards)。解决方法参考此篇文章：[另辟蹊径：vue单页面，多路由，前进刷新，后退不刷新](https://juejin.im/entry/5a1386ac51882554b8372a6c#comment)

8. ### 项目打包如何运行
项目打包完成之后控制台提示如下，不信可以直接去文件中直接打开index.html试试(我已经试过了0.0)。
```
Tip: built files are meant to be served over an HTTP server.
Opening index.html over file:// won't work.
```
所以还需要使用http-server这个插件，详细内容可到这里查看[利用http-server测试vue-cli打包后的项目](https://segmentfault.com/a/1190000012249873)。使用这个插件运行时会出现一些问题，文章中也提到了，不多说。

## 总结
项目虽小，但是用到vue的知识可不少，整个流程下来，vue的基本用法已经有所掌握，希望这个小项目也能帮到你。在此再次感谢参考到的项目、文章、教程的大佬作者们
