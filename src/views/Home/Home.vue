<template>
	<div class="home">
		<component 
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="home-index" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<home-top-swiper :bannerList="bannerList" v-if="hasSwiper_banner && isKeep"></home-top-swiper>
				<home-tabs></home-tabs>
				<home-hot :newsList="newsList" :questionList="questionList"></home-hot>
				<home-course 
				:courseClassList="courseClassList"
				@courseClassId="getCourseList"
				:courseList='courseList'></home-course>
				<home-teacher :hotTeacherList="hotTeacherList" v-if="hasSwiper_teacher"></home-teacher>
				<home-comment :commentList="commentList"></home-comment>
				<home-news 
				:tokenOver="tokenOver" 
				:footer_bottom="footer_bottom"
				:allNewsList="allNewsList"></home-news>
			</div>
		</div>
		<!-- <home-footer :alreadyTop="alreadyTop"></home-footer>	 -->
		
		<div v-html="script"></div>
	</div>
	
</template>

<script>
// import qs from 'qs'
import BScroll from 'better-scroll'
import HomeTopSwiper from './components/HomeTopSwiper'
import HomeTabs from './components/HomeTabs'
import HomeHot from './components/HomeHot'
import HomeCourse from './components/HomeCourse'
import HomeTeacher from './components/HomeTeacher'
import HomeComment from './components/HomeComment'
import HomeNews from './components/HomeNews'
import HomeDefaultHeader from '@/components/DefaultHeader'
import TopNotice from '@/components/TopNotice'
import HomeFooter from '@/components/Footer'
import { getHomeBanner,getHotTeacher} from '@/api/Home'
import {getNewsClass,getNewsList,getQuestionList,getCourseClass,getCourseList,getComment } from '@/api/Base'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
export default {
	name:"Home",
	components:{
		TopNotice,
		HomeDefaultHeader,
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
			//解决swiper-loop失效
			hasSwiper_banner:false,
			hasSwiper_teacher:false,
			bannerList:[],
			newsList:[],
			questionList:[],
			courseClassList:[],
			courseList:[],
			hotTeacherList:[],
			commentList:[],
			allNewsList:[],
			tokenOver:false,
			//导航监听显示
			showAbs:false,
			opacityStyle:{
				opacity:0	
			},
			//调用不同导航
			headerName:'HomeDefaultHeader',
			// 新闻页面下拉加载
			page:1,
			limit:4,
			//展示 news 底线
			footer_bottom:false,
			scroll:null,
			//判断顶部展示顶线
			alreadyTop:true,
			script:'',
			isKeep:false,//解决keep-alive切换 swiper loop问题
			// i:1
		}
	},
	activated() {
		// console.log('swiper')
		this.isKeep = true
	},
	deactivated() {
		this.isKeep = false
	},
	mounted() {
		this.init()
	},
	methods:{
		
		async init(){
			// console.log(this.i)
			// this.i++
			await this.$store.dispatch('Home/setCommonToken');
			this.tokenOver = true
			this.getBanner()
			this.getNewsList()
			this.getQuestionList()
			this.getCourseClass()
			this.getHotTeacher()
			this.getComment()
			this.getAllNews()
			this.Scroll()
			
		},
		Scroll(){
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:2,
				pullUpLoad: {
					threshold: -10
				},
				click: true,
				scrollX: false,
				scrollY: true,
				useTransition:false
			})
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				if(top>60){
					let opacity = top/140
					opacity = opacity>1?1:opacity
					this.opacityStyle = {opacity}
					this.showAbs = true
				}else{
					this.showAbs = false
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					this.getAllNews()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
			
		},
		//获取所有新闻 - 上拉加载
		getAllNews(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				page:this.page,
				limit:this.limit
			}
			// qs.stringify(data)
			new Promise((resolve, reject) => {
				getNewsList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNews接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.allNewsList = [...this.allNewsList, ..._list];
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						if (_list.length < this.limit || this.page == 3) {
							/* 所有数据加载完毕 */
							this.footer_bottom = true
							return;
						}
						/* 单次请求数据完毕 */
						this.page++;	
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取banner
		getBanner(){
			let data ={
				key:'m_home_slider',
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
						if(this.bannerList.length!=0){
							this.hasSwiper_banner = true
						}else{
							this.hasSwiper_banner = false
						}
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
		//根据 - 考研资讯 - 获取新闻列表
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
						if(this.hotTeacherList.length!=0){
							this.hasSwiper_teacher = true
						}else{
							this.hasSwiper_teacher = false
						}
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取评论
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
						this.$message.error('getComment接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getComment数据为空'):
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

<style scoped>
.home{
	height: 100%;
}
.home-index{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
}
</style>
