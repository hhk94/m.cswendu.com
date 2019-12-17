// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { setCommonToken,setLocalStorageCommonToken } from '@/api/Token'
import { getHomeBanner} from '@/api/Home'
import { console_log } from "@/utils/base.js"
import store from '@/store'
// import qs from 'qs'
const default_footer_choose = localStorage.getItem('DEFAULT_FOOTER_CHOOSE')?localStorage.getItem('DEFAULT_FOOTER_CHOOSE'):'shouye'
const state = {
	common_token:'',
	default_footer_choose:default_footer_choose,
	baidu_script:'',
	show_hidden:false
  // introduction: '',
  
}

const mutations = {
	COMMON_TOKEN: (state, common_token) => {
		state.common_token = common_token
	},
	DEFAULT_FOOTER_CHOOSE: (state, item) => {
		state.default_footer_choose = item
	},
	BAIDU_SCRIPT: (state, item) => {
		state.baidu_script = item
	},
	TO_TOP_SHOW_HIDDEN: (state, item) => {
		state.show_hidden = item
	},
}

const actions = {
  //进入页面的common-token
	setCommonToken({ commit }) {
		let page_url = window.location.href;
		let data ={
			"app_class": "mobile",
			"url": page_url
		}
		console_log()
		if(!store.getters.common_token){
			return new Promise((resolve, reject) => {
				setCommonToken(data).then(response => {
					resolve(response)
					setLocalStorageCommonToken(response.content.user_token)
					commit('COMMON_TOKEN', response.content.user_token)
					console_log('token设置完成')
					}).catch(error => {
						reject(error)
				})
			})
		}
		
	},
	joinScript({ commit }) {
		let data ={
		key:'baidu_tongji',
		app_class:'mobile',
		user_token:store.getters.common_token,
		}
		return new Promise((resolve, reject) => {
			getHomeBanner(data).then(response => {
				resolve(response)
				console_log(response)
				if(response.state==0){
					this.$message.error('joinScript接口错误');
				}else if(response.state==1){
					//empty
					// let script = response.value
					this.script= response.value
					commit('BAIDU_SCRIPT', response.value)
					
				}
				}).catch(error => {
					reject(error)
			})
		})
		
	},
	footerClick({ commit },item){
		console_log(item)
		commit('DEFAULT_FOOTER_CHOOSE', item)
		localStorage.setItem('DEFAULT_FOOTER_CHOOSE',item)
	},
	toTopShowOrHidden({ commit },item){
		// console_log(item)
		// console_log(commit)
		commit('TO_TOP_SHOW_HIDDEN', item)
	},
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}