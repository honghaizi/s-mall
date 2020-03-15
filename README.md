# small

## 目录结构 src
### assets 资源
> css-基础样式；
  img-常用图片；
### common 公共的js文件 公共常量-工具类
> navbar(navigationbar) 导航栏
### components 组件
> common-公共组件，各个项目都可通用的；
  content-当前项目业务相关；
### network 网络相关
> request.js 请求核心处理层 
  home.js 首页数据请求 <-> home.js <-> request.js 
### router 路由
### store Vuex状态管理工具
### views 主要视图 首页-分类-购物车之类的
> category-分类；
  home-首页；
## vue.config.js 配置别名
## .editorconfig 代码统一风格

***
***

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
