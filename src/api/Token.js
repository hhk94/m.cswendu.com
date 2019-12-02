import request from '@/utils/request'

export function setCommonToken(data) {
  return request({
    url: '/app/get_app_token',
    method: 'post',
    data
  })
}

export function setLocalStorageCommonToken(data) {
  localStorage.setItem('common_token',data)
}