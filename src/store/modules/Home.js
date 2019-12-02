// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { setCommonToken,setLocalStorageCommonToken } from '@/api/Token'
import { console_log } from "@/utils/base.js"
const state = {
	common_token:''
  // introduction: '',
  
}

const mutations = {
  COMMON_TOKEN: (state, common_token) => {
    state.common_token = common_token
  },

}

const actions = {
  //进入页面的common-token
	setCommonToken({ commit }) {
		let page_url = window.location.href;
		let data ={
			"app_class": "pc",
			"url": page_url
		}
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
	},

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}