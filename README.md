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
