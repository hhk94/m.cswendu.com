import request from '@/utils/request'
//获取新闻分类
export function getNewsClass(data) {
  return request({
    url: '/app/list_news_class',
    method: 'post',
    data
  })
}
//获取新闻列表
export function getNewsList(data) {
  return request({
    url: '/app/list_news',
    method: 'post',
    data
  })
}
//获取提问列表
export function getQuestionList(data) {
  return request({
    url: '/app/list_ask_question',
    method: 'post',
    data
  })
}

//获取课程分类
export function getCourseClass(data) {
  return request({
    url: '/app/list_course_class',
    method: 'post',
    data
  })
}
//获取课程列表
export function getCourseList(data) {
  return request({
    url: '/app/list_course',
    method: 'post',
    data
  })
}

//获取评论列表
export function getComment(data) {
  return request({
    url: '/app/list_course_comment',
    method: 'post',
    data
  })
}
