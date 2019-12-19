import Vue from 'vue'
import App from './App.vue'
import router from "./router"

import 'styles/resset.css'//自定义清零样式 - own clear css
import 'styles/border.css'//解决1像素边框 - deal with 1px border problem css
import store from './store'
//自定义公共js - own common css
import { console_log } from "./utils/base.js"
//elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//font-awesome
import 'font-awesome/css/font-awesome.min.css'
//vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
//处理点击延迟 - fastclick
import fastClick from 'fastclick'
fastClick.attach(document.body)

//animate
import animate from 'animate.css'
Vue.use(animate)
//vuex
import storeTotal from '@/store'
import Vuex from 'vuex'
Vue.use(Vuex)
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);
import {shareWx} from '@/api/Base'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '0DLYDIjeyUdprzjIGOwnAm2xmKjZdu7z'
})

//全局路由守卫 - 进入任何页面都获取一次token - 后端要求
router.beforeEach((to, from, next) => {
	console_log('to.path')
	console_log(to.path)
	console_log('此时执行')
	storeTotal.dispatch('Home/footerClick',to.path);	
	//进入页面就获取公共token
	if(to.path =='/spacial/spacial-1'){
		window.g.title = '文都考研【官网】全年集训营火热招生中'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}else if(to.path =='/spacial/spacial-2'){
		window.g.title = '文都考研【官网】彩虹卡火热招生中'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}else if(to.path =='/spacial/spacial-3'){
		window.g.title = '文都考研【官网】在职考研火热进行中'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}else if(to.path =='/shouye'){
		window.g.title = '文都考研-【官网】文都考研_考试专家助你飞速成功'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}else if(to.path =='/course-list'){
		window.g.title = '文都考研-【官网】课程列表'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}else if(to.path =='/news-list'){
		window.g.title = '文都考研-【官网】资讯列表'
		window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
	}
	
	shareWx()
	
	
	// if (to.path === "/course"){
	// 	next({
	// 		path: '/course'
	// 	});
	// } else {
	// 	next()
	// }
	next()
});

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


