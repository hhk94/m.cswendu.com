import request from '@/utils/request'
import qs from 'qs'

//获取问题
export function getAskDetail(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/that_ask_question',
		method: 'post',
		data
	})
}

//获取回答
export function getAnswerList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_answer',
		method: 'post',
		data
	})
}
