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

export function getCourseClass(data) {
  return request({
    url: '/app/list_course_class',
    method: 'post',
    data
  })
}

export function getCourseList(data) {
  return request({
    url: '/app/list_course',
    method: 'post',
    data
  })
}

export function getHotTeacher(data) {
  return request({
    url: '/app/teacher_hot',
    method: 'post',
    data
  })
}

export function getComment(data) {
  return request({
    url: '/app/list_course_comment',
    method: 'post',
    data
  })
}

export function getNews(data) {
  return request({
    url: '/app/list_news',
    method: 'post',
    data
  })
}