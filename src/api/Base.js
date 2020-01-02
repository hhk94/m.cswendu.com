import request from '@/utils/request'
import { console_log} from "@/utils/base.js"
import qs from 'qs'
import wx from 'weixin-js-sdk';
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


//获取微信配置参数
export function WxParams(data) {
	data = qs.stringify(data)
	return request({
		url: '/enhance/get_wx_share_data',
		method: 'post',
		data
	})
}

export function shareWx(fullpath){
	let url = encodeURI(window.location.href);
	let data ={
		url:url.split("#")[0]
	}
	// console_log(window)
	// console_log(url.split("#")[0])
	let url_ = url.split("#")[1]
	let url_params = url_.split("?")[1]
	
	console_log(url_)
	console_log(url_params)
	
	new Promise((resolve, reject) => {
		WxParams(data).then(response => {
			resolve(response)
			console_log(response)
			if(response.state==0){
				this.$message.error('Wx接口错误');
			}else if(response.state==1){
				//empty
				let params = {
					title: window.g.title, // 分享标题
					desc: window.g.description, // 分享描述
					link:url.split("#")[0]+"#"+fullpath, // 分享链接
					// link:url.split("#")[0]+"#"+path+"?"+url_params, // 分享链接
					imgUrl: window.g.WxShareImgUrl, // 分享图标
				}
				console_log('微信配置')
				WxConfig(response.content,params)
			}
			}).catch(error => {
				reject(error)
		})
	})
}
//配置微信config
export function WxConfig(res,data) {
	let appid = res.appid;
	let timestamp = res.timestamp*1;
	let nonceStr = res.nonceStr;
	let signature = res.signature;
	wx.config({
		debug: false, // 是否开启调试
		appId: appid,
		timestamp: timestamp,
		nonceStr: nonceStr,
		signature: signature,
		jsApiList: [
			"checkJsApi",
			"onMenuShareTimeline",
			"onMenuShareAppMessage",
			"onMenuShareQQ",
			"onMenuShareWeibo",
		]
	});
	console_log(data)
	wx.ready(function () {
		let shareData = {
		title: data.title,
		desc: data.desc,
		link: data.link,
		imgUrl: data.imgUrl,
		success: function () {
			console_log("分享成功");
		},
		cancel: function () {
			console_log("分享取消");
		}
		};

		wx.onMenuShareAppMessage(shareData);
		wx.onMenuShareTimeline(shareData);
		wx.onMenuShareQQ(shareData);
		wx.onMenuShareWeibo(shareData);
	
	});
}
