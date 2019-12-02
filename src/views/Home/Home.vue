<template>
	<div>
		<home-header></home-header>
		<home-top-swiper :bannerList="bannerList" ></home-top-swiper>
		<home-tabs></home-tabs>
		<home-hot :newsList="newsList" :questionList="questionList"></home-hot>
		<home-footer></home-footer>
	</div>
	
</template>

<script>
import HomeTopSwiper from './components/HomeTopSwiper'
import HomeTabs from './components/HomeTabs'
import HomeHot from './components/HomeHot'
import HomeHeader from '@/components/Header'
import HomeFooter from '@/components/Footer'
import { getHomeBanner,getNewsClass,getNewsList,getQuestionList } from '@/api/Home'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
// import store from '@/store'
// import { setCommonToken } from '@/api/Token'
export default {
	name:"Home",
	components:{
		HomeHeader,
		HomeTopSwiper,
		HomeTabs,
		HomeHot,
		HomeFooter
	},
	data (){
		return {
			bannerList:[],
			newsList:[],
			questionList:[],
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		async init(){
			let token = await this.$store.dispatch('Home/setCommonToken');
			token = token.content.user_token
			this.getBanner(token)
			this.getNewsList(token)
			this.getQuestionList(token)
		},
		//获取banner
		getBanner(token){
			let data ={
				key:'home_slider',
				user_token:token,
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
		getNewsClass(token){
			let data ={
				user_token:token,
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
		async getNewsList(token){
			let news_class_ids = await this.getNewsClass(token)
			console_log(news_class_ids)
			let news_class_id = ''
			news_class_ids.content.length!=0&&(news_class_ids.content.filter((item)=>{
				if(item.class_name=="考研资讯"){
					news_class_id = item.news_class_id
				}
			}))
			let data ={
				user_token:token,
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
		getQuestionList(token){
			let data ={
				user_token:token,
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
		
	}
}
</script>

<style>

</style>
