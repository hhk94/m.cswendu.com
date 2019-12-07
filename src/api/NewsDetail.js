import request from '@/utils/request'
import qs from 'qs'

//获取新闻详情
export function getNewsDetail(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/that_news',
		method: 'post',
		data
	})
}

