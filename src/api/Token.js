import request from '@/utils/request'
import qs from 'qs'
export function setCommonToken(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/get_app_token',
		method: 'post',
		data,
	// mode: "cors", 
	})
}

export function setLocalStorageCommonToken(data) {
  localStorage.setItem('common_token',data)
}