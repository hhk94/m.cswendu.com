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
- 13.animate 处理动画效果
- 14.接入wx-sdk制作微信分享，路由守卫统一处理
- 15.基于vue-lazyload 接入懒加载


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
- 9.isKeep 用于判断swiper重新渲染

#### 2019-12-10

- 1.better-scroll click属性在页面测试中会导致click事件触发2次，但是禁止后移动端不触发，仍然要打开为true
- 2.download-detail页面细节有待完善

#### 2019-12-12
- 1.修复新闻页面同类class 循环 key 重复问题
- 2.修复news-detail页面进入不滚动至头部问题
- 3.course-list 暂时为根据class-name 跳转3个不同的spacial专题页面
- 4.修复ask-detail页面 没有最佳回答渲染问题
- 5.增加页面切换动画，修复swiperkeep-alive中auto-play失效问题
- 6.顶部提示封装到公共components
- 7.新增download 下载需要填写form表单， animate制作动画

#### 2019-12-16
- 1.修复app.vue中插入百度统计代码，会发两次common_token请求的问题

#### 2019-12-17
- 1.新增回到顶部按钮
- 2.增加按钮动画
- 3.引入mapState、mapActions

#### 2019-12-19
- 1.接入wx-sdk 专题页制作分享

#### 2019-12-20
- 1.基于vue-lazyload 接入懒加载

#### 2019-12-23
- 1.修复懒加载 - 加载图片问题

#### 2019-12-24
- 1.修复wx-sdk分享，
-   window.location.herf 在vue hash模式下，获取的url有一定几率重复为首页，
-   因此改为截取#前url地址，拼接 路由 to.path，解决问题 

#### 2019-01-02
- 1.修改整体样式
- 2.修改地址详情  名字和地点未变的bug，将参数获取从created中移出
- 3.修复wx-sdk分享，
-   采用拼接to.path ?后参数 path不会自带，因此详情页分享出现问题，采用拼接?后参数解决
- 4._3的问题，可以采用 拼接to.fullpath 解决  


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
