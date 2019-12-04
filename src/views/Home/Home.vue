<template>
	<div>
		<home-header></home-header>
		<home-top-swiper :bannerList="bannerList" ></home-top-swiper>
		<home-tabs></home-tabs>
		<home-hot :newsList="newsList" :questionList="questionList"></home-hot>
		<home-course 
		:courseClassList="courseClassList"
		@courseClassId="getCourseList"
		:courseList='courseList'></home-course>
		<home-teacher :hotTeacherList="hotTeacherList"></home-teacher>
		<home-comment :commentList="commentList"></home-comment>
		<home-news :tokenOver="tokenOver"></home-news>
		<home-footer></home-footer>
	</div>
	
</template>

<script>
import HomeTopSwiper from './components/HomeTopSwiper'
import HomeTabs from './components/HomeTabs'
import HomeHot from './components/HomeHot'
import HomeCourse from './components/HomeCourse'
import HomeTeacher from './components/HomeTeacher'
import HomeComment from './components/HomeComment'
import HomeNews from './components/HomeNews'
import HomeHeader from '@/components/Header'
import HomeFooter from '@/components/Footer'
import { getHomeBanner,getNewsClass,getNewsList,getQuestionList,getCourseClass,getCourseList,getHotTeacher,getComment } from '@/api/Home'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
export default {
	name:"Home",
	components:{
		HomeHeader,
		HomeTopSwiper,
		HomeTabs,
		HomeHot,
		HomeCourse,
		HomeTeacher,
		HomeComment,
		HomeNews,
		HomeFooter
	},
	data (){
		return {
			bannerList:[],
			newsList:[],
			questionList:[],
			courseClassList:[],
			courseList:[],
			hotTeacherList:[],
			commentList:[],
			tokenOver:false
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			// token = token.content.user_token
			this.tokenOver = true
			this.getBanner()
			this.getNewsList()
			this.getQuestionList()
			this.getCourseClass()
			this.getHotTeacher()
			this.getComment()
		},
		//获取banner
		getBanner(){
			let data ={
				key:'home_slider',
				user_token:store.getters.common_token,
			}
			new Promise((resolve, reject) => {
				getHomeBanner(data).then(response => {
					resolve()
					console_log(response)
					if(response.state==0){
						this.$message.error('getHomeBanner接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getHomeBanner数据为空'):
						this.bannerList = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取新闻分类
		getNewsClass(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				news_class_id:'all',
			}
			return new Promise((resolve, reject) => {
				getNewsClass(data).then(response => {
					resolve(response)
					console_log(response)
					}).catch(error => {
						reject(error)
				})
			})
		},
		//根据考研资讯获取新闻列表
		async getNewsList(){
			let news_class_ids = await this.getNewsClass()
			console_log(news_class_ids)
			let news_class_id = ''
			news_class_ids.content.length!=0&&(news_class_ids.content.filter((item)=>{
				if(item.class_name=="考研资讯"){
					news_class_id = item.news_class_id
				}
			}))
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				news_class_id:news_class_id,
				page: 1,
				limit: 20
			}
			new Promise((resolve, reject) => {
				getNewsList(data).then(response => {
					resolve(response)
					if(response.state==0){
						this.$message.error('getNewsList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getNewsList数据为空'):
						this.newsList = response.content
					}
					console_log(response)
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取社区问答列表
		getQuestionList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				ask_question_id: "all",
				page: 1,
				limit: 4
			}
			new Promise((resolve, reject) => {
				getQuestionList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getQuestionList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getQuestionList数据为空'):
						this.questionList = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取课程分类
		getCourseClass(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_class_id: 'all'
			}
			new Promise((resolve, reject) => {
				getCourseClass(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getQuestionList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getQuestionList数据为空'):
						this.courseClassList = response.content
						this.getCourseList(this.courseClassList[0].course_class_id)
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		getCourseList(id){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_id: "all",
				course_class_id:id,
				page:1,
				limit:4
			}
			console_log(data)
			new Promise((resolve, reject) => {
				getCourseList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getCourseList数据为空'):
						this.courseList = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取热门老师
		getHotTeacher(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				teacher_id: 'hot'
			}
			new Promise((resolve, reject) => {
				getHotTeacher(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getQuestionList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getQuestionList数据为空'):
						this.hotTeacherList = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取热门老师
		getComment(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_comment_id:'all',
				page:1,
				limit:4
			}
			new Promise((resolve, reject) => {
				getComment(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getQuestionList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getQuestionList数据为空'):
						this.commentList = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		
	}
}
</script>

<style>

</style>
