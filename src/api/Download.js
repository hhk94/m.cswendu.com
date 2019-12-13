import request from '@/utils/request'
import qs from 'qs'

//获取下载列表
export function getDwoanloadList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_file',
		method: 'post',
		data
	})
}
//d获取单独文件信息
export function getFile(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/that_file',
		method: 'post',
		data
	})
}
//d制作下载链接
export function productHerf(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/make_file_href',
		method: 'post',
		data
	})
}


//获取验证码
export function getCode(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/check_user_phone',
		method: 'post',
		data
	})
}

//报名
export function submitUserInfo(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/check_code_sms',
		method: 'post',
		data
	})
}
