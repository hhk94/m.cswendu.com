import request from '@/utils/request'
import qs from 'qs'

//获取教师详情
export function getTeacherDetail(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/teacher_that',
		method: 'post',
		data
	})
}

