<template>
	<div class="course-list-father">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"
		></component>
		<div class="course-list-body" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<home-top-swiper :bannerList="bannerList" v-if="hasSwiper && isKeep"></home-top-swiper>
				<div class="course-list">
					<div class="tabs">
						<div 
						:class="{'active':isActive==item.course_class_name,'tabs-item':true}"
						v-for="(item,index) of courseClassList"
						@click="tabChange(item.course_class_name,item.course_class_id)"
						:key="index">{{item.course_class_name}}</div>
						
					</div>
					<div class="list">
						<div
						@click="goToSpacial(item.course_class_name)" 
						v-for="item of courseList"
						:key="item.course_id"
						class="list-item">
							<div class="img-box"><img :src="item.course_cover" alt=""></div>
							<div class="word">
								<h1>{{item.course_name}}</h1>
								<h2>{{item.course_slogan}}</h2>
								<h2>{{item.course_description}}</h2>
							</div>
							<a class="ask" @click.stop="ask()">在线咨询</a>
						</div>
					</div>
					<bottom-notice :footer_bottom="footer_bottom"></bottom-notice>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
import Utils from '@/utils/Utils.js'//和app.vue通信 点击回到顶部
import BScroll from 'better-scroll'
import DefaultHeader from '@/components/DefaultHeader'
import TopNotice from '@/components/TopNotice'
import BottomNotice from '@/components/BottomNotice'
import { getHomeBanner} from '@/api/Home'
import {getCourseClass,getCourseList } from '@/api/Base'
import HomeTopSwiper from '../Home/components/HomeTopSwiper'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import { mapActions} from 'vuex'
export default {
	name:"CourseList",
	components:{
		DefaultHeader,
		HomeTopSwiper,
		TopNotice,
		BottomNotice
	},
	data(){
		return{
			hasSwiper:false,
			isActive:'',
			bannerList:[],
			courseClassList:[],
			courseList:[],
			//导航监听显示
			showAbs:false,
			opacityStyle:{
				opacity:0	
			},
			//调用不同导航
			headerName:'DefaultHeader',
			//判断顶部展示顶线
			alreadyTop:true,
			page:1,
			limit:4,
			course_class_id:0,
			footer_bottom:false,
			isKeep:false,//解决keep-alive切换 swiper loop问题
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
		var that = this;
		Utils.$on('toTop', function () {
		that.scrollToTop();
		})
	},
	methods:{
		...mapActions("Home",['toTopShowOrHidden']),
		scrollToTop(){
			this.scroll.scrollTo(0,0,1000) 
		},
		ask(){
			window.location.href = window.g.kf53
		},
		goToSpacial(course_name){
			console_log(course_name)
			if(course_name =='鹰飞集训营'){
				this.$router.push({path:'/spacial/spacial-1',query:{}}).catch(err => {err})
			}else if(course_name =='高端彩虹卡'){
				this.$router.push({path:'/spacial/spacial-2',query:{}}).catch(err => {err})
			}else if(course_name =='定制课'){
				this.$router.push({path:'/spacial/spacial-3',query:{}}).catch(err => {err})
			}
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getBanner()
			this.getCourseClass()
			this.Scroll()
		},
		tabChange(item,id){
			this.isActive = item
			console_log(id)
			this.course_class_id = id
			
			this.courseList = []
			this.page = 1
			this.footer_bottom = false
			this.scroll.finishPullUp()
			
			console_log(this.page)
			console_log(this.courseList )
			this.getCourseList()
		},
		Scroll(){
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:2,
				pullUpLoad: {
					threshold: -10
				},
				scrollX: false,
				scrollY: true,
				useTransition:false,
				click: true
			})
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				console_log(this.alreadyTop)
				if(top>60){
					let opacity = top/140
					opacity = opacity>1?1:opacity
					// this.opacityStyle = {opacity}
					this.opacityStyle = {opacity:opacity,background: "#7abff7"}
					this.showAbs = true
					this.toTopShowOrHidden(true)
				}else{
					this.showAbs = false
					this.toTopShowOrHidden(false)
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					this.getCourseList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
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
							this.hasSwiper = true
						}else{
							this.hasSwiper = false
						}
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
						this.courseClassList = this.courseClassList.slice(0,3)
						this.course_class_id = this.courseClassList[0].course_class_id
						this.isActive = this.courseClassList[0].course_class_name
						this.getCourseList()
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		getCourseList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_id: "all",
				course_class_id:this.course_class_id,
				page:this.page,
				limit:this.limit
			}
			console_log(data)
			new Promise((resolve, reject) => {
				getCourseList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.courseList = [...this.courseList, ..._list];
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						if (_list.length < this.limit||this.limit*this.page>=response.paging.total) {
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
	}
}
</script>

<style  scoped lang="less">
.course-list-father{
	height: 100%;
}
.course-list-body{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;

	.course-list{
		width: @design-center;
		margin: 0.3rem auto 0 auto;
		margin-top: 0.7rem;;
		padding-bottom: 0.5rem;
		.tabs{
			width: 82.2%;
			margin: 0.3rem auto 0.14rem auto;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			
			.tabs-item{
				padding: 0.25rem 0;
				font-size: @title;
				color:@sec-color;
				position: relative;
				&.active{
					color: @tab-color;
					&::after{
						position: absolute;
						left:50%;
						transform: translateX(-50%);
						bottom:0;
						content: "";
						display: block;
						background: @theme-color;
						width: 0.3rem;
						height: 0.05rem;
					}
				}
			}
		}
		.list{
			width: 100%;
			.list-item{
				width: 100%;
				overflow: hidden;
				// background: #0086B3;
				position: relative;
				border-radius: 0.2rem;
				box-shadow: 0 0 0.1rem 0.02rem @theme-color;
				margin-bottom: 0.2rem;
				.img-box{
					float: left;
					width: 40.8%;
					height: 0;
					padding-bottom: 23.8%;
					// background: red;
					border-radius: 0.1rem;
					overflow: hidden;
					margin: 5% 2%;
					img{
						width: 100%;
					}
				}
				.word{
					float: left;
					width: calc(~" 100% - 40.8% - 4%" );
					height: 0;
					padding: 0 0.2rem 19.8% 0.2rem;
					// background: red;
					margin: 4% 0;
					h1{
						font-size: @tab-size;
						color: #525252;
					}
					h2{
						margin-top: 0.1rem;
						font-size: @sec-title;
						color: #898989;
					}
				}
				.ask{
					position: absolute;
					right: 0.1rem;
					bottom: 0.1rem;
					height: 0.4rem;
					line-height: 0.4rem;
					text-align: center;
					color: white;
					font-size: @sec-title;
					background: @theme-color;
					display: block;
					padding: 0 0.1rem;
					border-radius: 0.4rem;
				}
			}
		}
	}
}
</style>
