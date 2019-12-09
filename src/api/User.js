import request from '@/utils/request'
import qs from 'qs'
export function submit(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/user_phone_order',
		method: 'post',
		data,
	// mode: "cors", 
	})
}
