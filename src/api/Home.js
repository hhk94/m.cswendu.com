import request from '@/utils/request'
import qs from 'qs'
//获取首页banner
export function getHomeBanner(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/get_array_cover_img',
		method: 'post',
		data
	})
}

//获取热门老师
export function getHotTeacher(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/teacher_hot',
		method: 'post',
		data
	})
}
