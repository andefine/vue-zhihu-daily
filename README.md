# vue-zhihu-daily

> A Vue.js project

## Build Setup

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# records

## 使用vue-cli创建项目
几个test不要，其他统统默认

## vue-router的使用

## 使用lib-flexible适配移动端
安装完之后在main.js中引入，此时就可以使用rem单位了。然后安装px2rem-loader，实现可以直接写px单位，安装完需要在build/utils中配置一下，其中有一个cssLoaders的方法，在里面添加一个变量，如下：
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

## 安装node-sass,sass-loader让.vue文件中写style时可以直接使用scss



## 配置开发时的api代理，实现跨域，修改config/index.js，找到proxyTable，修改：
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
使用axios时。。。。

[vue cli+axios踩坑记录+拦截器使用，代理跨域proxy（更新）](https://blog.csdn.net/u012369271/article/details/72848102)

[API Proxying During Development](http://vuejs-templates.github.io/webpack/proxy.html)

## 使用axios获取的图片url直接放在img的src属性中呢，会出现403的错误(╥╯^╰╥)。解决方法
[【前端】解决访问api图片403禁止访问问题](https://segmentfault.com/a/1190000011628835)

## vue-awesome-swiper使用v-for渲染数据时，设置loop:true无效，解决方法：在父元素中添加v-if="xxx.length > 0"。答案在此[{ loop: true } swiper-slide goes wrong when data is from v-for](https://github.com/surmon-china/vue-awesome-swiper/issues/322)

## 预实现返回不刷新，所以使用了\<keep-alive\>。此时返回的确是不刷新了，但是出现了一个新问题，当路由参数改变时，前进也不会刷新= =。(可以先去看一下[Vue Router官方文档](https://router.vuejs.org/)中Dynamic Route Matching下的Reacting to Params Changes和Navigation Guards)。解决方法参考此篇文章：[另辟蹊径：vue单页面，多路由，前进刷新，后退不刷新](https://juejin.im/entry/5a1386ac51882554b8372a6c#comment)，在此感谢作者大佬
