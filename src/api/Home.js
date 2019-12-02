import request from '@/utils/request'

export function getHomeBanner(data) {
  return request({
    url: '/app/get_array_cover_img',
    method: 'post',
    data
  })
}

export function getNewsClass(data) {
  return request({
    url: '/app/list_news_class',
    method: 'post',
    data
  })
}

export function getNewsList(data) {
  return request({
    url: '/app/list_news',
    method: 'post',
    data
  })
}

export function getQuestionList(data) {
  return request({
    url: '/app/list_ask_question',
    method: 'post',
    data
  })
}


