<template>
	<div class="hot-course-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="hot-course" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="hot-course-top"></div>
				<div class="hot-course-center">
					<div class="hot-item"
					@click="goToSpacial(item.course_name)"
					v-for="item of courseList"
					:key="item.course_id">
						<div class="img-box"><img  v-lazy="item.http_img " alt=""></div>
						<div class="word">
							<h1>{{item.course_name}}</h1>
							<h2>*{{item.course_slogan}}</h2>
							<h3>{{item.course_description}}</h3>
						</div>
						<div class="hot-icon">HOT!</div>
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
import BackHeader from '@/components/BackHeader'
import TopNotice from '@/components/TopNotice'
import BottomNotice from '@/components/BottomNotice'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import {getCourseClass,getCourseList } from '@/api/Base'
import { mapActions} from 'vuex'
export default {
	name:"HomeCourse",
	components:{
		BackHeader,
		TopNotice,
		BottomNotice
	},
	data (){
		return {
			courseList:[],
			scroll:null,
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'transparent'
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:true
		}
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
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getCourseList()
			this.Scroll()
		},
		Scroll(){
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:2,
				scrollX: false,
				scrollY: true,
				useTransition:false,
				click: true
			})
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				console.log(this.alreadyTop)
				if(top>60){
					let opacity = 1
					opacity = opacity>1?1:opacity
					this.opacityStyle = {opacity:opacity}
					// console.log(this.opacityStyle)
					// this.showAbs = true
					this.toTopShowOrHidden(true)
				}else{
					// this.showAbs = false
					this.toTopShowOrHidden(false)
				}
			})
		},
		goToSpacial(course_name){
			console_log(course_name)
			if(course_name =='2021全年集训营'){
				this.$router.push({path:'/spacial/spacial-1',query:{}}).catch(err => {err})
			}else if(course_name =='2021高端彩虹卡'){
				this.$router.push({path:'/spacial/spacial-2',query:{}}).catch(err => {err})
			}else{
				this.$router.push({path:'/spacial/spacial-3',query:{}}).catch(err => {err})
			}
		},
		//获取新闻分类
		getCourseClass(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_class_id:'all',
			}
			return new Promise((resolve, reject) => {
				getCourseClass(data).then(response => {
					resolve(response)
					console_log(response)
					}).catch(error => {
						reject(error)
				})
			})
		},
		//根据考研资讯获取新闻列表
		async getCourseList(){
			let course_class_ids = await this.getCourseClass()
			console_log(course_class_ids)
			let course_class_id = ''
			course_class_ids.content.length!=0&&(course_class_ids.content.filter((item)=>{
				if(item.course_class_name=="热门课程（用于首页和推荐）"){
					course_class_id = item.course_class_id
				}
			}))
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_class_id:course_class_id,
				course_id: "all",
				page: 1,
				limit: 20
			}
			new Promise((resolve, reject) => {
				getCourseList(data).then(response => {
					resolve(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						response.content.length==0?
						this.$message.error('getCourseList数据为空'):
						this.courseList = response.content
						this.courseList.forEach((item,index)=>{
							if(item.course_cover!=''){
								this.courseList[index].http_img = window.g.http+item.course_cover
							}
						})
					}
					console_log(response)
					}).catch(error => {
						reject(error)
				})
			})
		},
		
	}
}
</script>

<style scoped lang="less">
.hot-course-body{
	height: 100%;
}
.hot-course{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.hot-course-top{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 35.1%;
		background: url('~@/assets/img/m-hot-course-bg.png') no-repeat center center /cover;
	}
	.hot-course-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.hot-item{
			width: 100%;
			overflow: hidden;
			border-radius: 0.2rem;
			background: #e3e4fb;
			margin-bottom: 0.2rem;
			position: relative;
			.hot-icon{
				position: absolute;
				top: 0.1rem;
				right: 0.1rem;
				background: #fb4125;
				height: 0.3rem;
				line-height: 0.3rem;
				color: white;
				padding: 0 0.1rem;
				border-radius: 0.3rem;
				font-weight: bold;
			}
			.img-box{
				float: left;
				margin: 2%;
				width: 53.9%;
				// background: red;
				padding-bottom: 33.1%;
				overflow: hidden;
				height: 0;
				border-radius: 0.1rem;
				img{
					width: 100%;
				}
			}
			.word{
				float: left;
				width: calc(~"100% - 53.9% - 4%");
				padding-bottom: 33.1%;
				height: 0;
				position: relative;
				h1{
					font-weight: bold;
					margin-top: 0.5rem;
					font-size: 0.3rem;
					color: #323232;
				}
				h2{
					font-size: 0.2rem;
					color: #646464;
					margin-top: 0.1rem;
				}
				h3{
					position: absolute;
					font-size: 0.16rem;
					color: #646464;
					left: 0;
					bottom: 0.05rem;;
				}
			}
		}
	}
}
</style>
