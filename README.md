# m.cswendu.com
## 基于Vue CLI3.0开发

#### 开发规范

- 1.前后端分离
- 2.公共接口请求地址
- 3.公共图片引用地址
- 4.进入页面验证common-token
- 5.console.log封装，仅在调试模式下打印
- 6.基于vuex进行状态管理,命名空间模块化分割
- 7.api统一封装，管理axios请求
- 8.采用better-scroll 处理上拉刷新、下拉加载、全局滚动 - (滚动封装有待下次代码改版)
- 9.路由守卫监控跳转路径，修改footer-tabs导航
- 10.上拉提示组件封装
- 11.fastclick处理点击事件
- 12.vue-baidu-map 实现地图功能

#### 页面参数定义

##### home页面 

- 1.hasSwiper_XXX	处理swiper - loop 事件在无数据时不生效 v-if 判断条件
- 2.tokenOver	页面获取到数据 在渲染swiper
- 3.headerName	调用不同的fixed导航
- 4.footer_bottom	判断是否到底部，展示底部 底线
- 5.alreadyTop	判断是否到顶部，展示顶部 提示
- 6.showAbs/opacityStyle	fixed导航样式调整
- 7.page/limit	用于上拉加载的组件计算分页
- 8.scroll	用于调用better-scroll制作滚动
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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
