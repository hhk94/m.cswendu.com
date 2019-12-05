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
// import { setCommonToken,setLocalStorageCommonToken } from '@/api/Token'
//vuex
import storeTotal from '@/store'
import Vuex from 'vuex'
Vue.use(Vuex)
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import YDUI from 'vue-ydui'; 
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);


//全局路由守卫 - 进入任何页面都获取一次token - 后端要求
router.beforeEach((to, from, next) => {
	console_log(to.path)
	console_log('此时执行')
	storeTotal.dispatch('Home/footerClick',to.path);	
	//进入页面就获取公共token
	
	// let page_url = window.location.href;
	// let data ={
	// 	"app_class": "pc",
	// 	"url": page_url
	// }	 
	// // 获取commonToken
	// new Promise((resolve, reject) => {
	// 	setCommonToken(data).then(response => {
	// 		resolve()
	// 		console_log(response)
	// 		setLocalStorageCommonToken(response.content.user_token)
			
	// 		console_log('token设置完成')
	// 		}).catch(error => {
	// 			reject(error)
	// 	})
	// })
	if (to.path){
		next()
	} 
	// if (to.path === "/course"){
	// 	next({
	// 		path: '/course'
	// 	});
	// } else {
	// 	next()
	// }
	
});

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


