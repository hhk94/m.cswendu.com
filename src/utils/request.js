import axios from 'axios'
import { MessageBox, Loading ,Message } from 'element-ui'
// import { getCommonToken,setLocalStorageCommonToken } from '@/api/Token'
// import { console_log } from "@/utils/base.js"
// import store from '@/store'
// import { getToken } from '@/utils/base'

//请求加载动画
var needLoadingRequestCount = 0;
var loadingInstance;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
 
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
function startLoading() {
	loadingInstance = Loading.service({
		target:"html",
		lock: true,
		text: '加载中...',
		// spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)'
	});
}
function endLoading() {
  loadingInstance.close()
}
// create an axios instance
var baseURLStr = window.g.ApiUrl
var baseURL = ''
if(process.env.NODE_ENV=='development'){
    baseURL = process.env.VUE_APP_BASEURL;
}else if(process.env.NODE_ENV=='production'){
		
    baseURL = baseURLStr;
}
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(

  config => {
    // do something before request is sent
	if(config.isLoading != false){
		showFullScreenLoading();
	}
	
	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
	loadingInstance.close();
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
	tryHideFullScreenLoading();
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
	tryHideFullScreenLoading();
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service