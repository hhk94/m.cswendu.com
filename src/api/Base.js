import request from '@/utils/request'
import qs from 'qs'
//获取新闻分类
export function getNewsClass(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_news_class',
		method: 'post',
		data
	})
}
//获取新闻列表
export function getNewsList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_news',
		method: 'post',
		data
	})
}
//获取提问列表
export function getQuestionList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_ask_question',
		method: 'post',
		data
	})
}

//获取课程分类
export function getCourseClass(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_course_class',
		method: 'post',
		data
	})
}
//获取课程列表
export function getCourseList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_course',
		method: 'post',
		data
	})
}

//获取评论列表
export function getComment(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_course_comment',
		method: 'post',
		data
	})
}

//获取老师分类
export function getTeacherClass(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_teacher_class',
		method: 'post',
		data
	})
}

//获取老师列表
export function getTeacherList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/teacher_list',
		method: 'post',
		data
	})
}

//获取校区分类
export function getCampusClass(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_campus_class',
		method: 'post',
		data
	})
}

//获取校区列表
export function getCampusList(data) {
	data = qs.stringify(data)
	return request({
		url: '/app/list_campus',
		method: 'post',
		data
	})
}