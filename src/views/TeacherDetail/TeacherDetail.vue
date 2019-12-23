<template>
	<div class="teacher-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="teacher" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="teacher-center">
					<div class="pic-and-word">
						<div class="pic"><img :src="this.teacher_info.http_img" alt=""></div>
						<div class="word">
							<h1>{{this.teacher_info.teacher_name}}</h1>
							
							<span>{{this.teacher_info.class_name}}</span>
						</div>
					</div>
					<div class="pic-box" :style="background"></div>
					<div class="info">
						<div class="type" v-show="this.teacher_lecture.length>1">
							<h1>【讲授科目】</h1>
							<p>{{this.teacher_lecture}}</p>
						</div>
						<div class="type" v-show="this.teacher_grading.length>1">
							<h1>【业界地位】</h1>
							<p>{{this.teacher_grading}}</p>
						</div>
						<div class="type" v-show="this.teacher_books.length>1">
							<h1>【畅销书籍】</h1>
							<p>{{this.teacher_books}}</p>
						</div>
					</div>
					
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
import Utils from '@/utils/Utils.js'//和app.vue通信 点击回到顶部
import BackHeader from '@/components/BackHeader'
import TopNotice from '@/components/TopNotice'
//自定义公共js - own common css
import { console_log} from "@/utils/base.js"
import store from '@/store'
import BScroll from 'better-scroll'
import {getTeacherDetail} from '@/api/TeacherDetail'
import { mapActions} from 'vuex'
export default {
	name:"TeacherDetail",
	components:{
		BackHeader,
		TopNotice,
	},
	data (){
		return {
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'#7abff7'
			},
			background:{
				background:''
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			teacher_id:'',
			teacher_info:{},
			teacher_books:'',
			teacher_grading:'',
			teacher_lecture:''
		}
	},
	activated() {
		this.init()
	},
	mounted() {
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
		Scroll(){
			
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:2,
				pullUpLoad: {
					threshold: -10
				},
				scrollX: false,
				scrollY: true,
				useTransition:false,
				click: false
			})
			
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				// console_log(this.alreadyTop)
				if(top>60){
					this.toTopShowOrHidden(true)
				}else{
					this.toTopShowOrHidden(false)
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					// this.getTeacherList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		async init(){
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
			this.teacher_id = this.$route.query.teacher_id
			this.getTeacherDetail()
			this.Scroll()
		},
		getTeacherDetail(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				teacher_id: this.teacher_id
			}
			// console.log(id)
			new Promise((resolve, reject) => {
				getTeacherDetail(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNewsDetail接口错误');
					}else if(response.state==1){
						
						this.teacher_info = response.content
						this.teacher_info.http_img = window.g.http+this.teacher_info.teacher_cover
						this.background = {background:"url("+this.teacher_info.http_img+") no-repeat center center /cover" },
						this.teacher_books = response.content.teacher_books
						this.teacher_grading = response.content.teacher_grading
						this.teacher_lecture = response.content.teacher_lecture
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		
	}
}
</script>

<style scoped lang="less">
.teacher-body{
	height: 100%;
}
.teacher{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.pic-box{
		width: 100%;
		height: 4.8rem;
		-webkit-filter: blur(10px); /* Chrome, Opera */
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);    
		filter: blur(10px);
	}
	.pic-and-word{
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		.pic{
			width: 3.16rem;
			height: 3.16rem;
			border-radius: 50%;
			border: 1px solid white;
			overflow: hidden;
			img{
				width: 100%;
			}
		}
		.word{
			margin-top: 0.15rem;
			h1{
				font-size: 0.36rem;
				color: white;
				font-weight: bold;
				text-align: center;
			}	
			span{
				font-size: 0.22rem;
				color: white;
				height: 0.3rem;
				line-height: 0.3rem;
				margin-top: -0.3rem;
				margin-right: -0.5rem;
				padding: 0 0.1rem;
				border-radius: 0.05rem;
				background: @theme-color;
				float: right;
			}
		}
	}
	.info{
		width: @design-center;
		padding-top: 0.4rem;
		margin: 0 auto;
		padding-bottom:1rem;
		.type{
			margin-bottom: 0.2rem;
			h1{
				font-size: 0.26rem;
				color: #323232;
				margin-bottom: 0.2rem;
				font-weight: bold;
			}
			p{
				text-indent: 0.2rem;
				font-size: 0.24rem;
				color: #525252;
				line-height: 0.3rem;
			}
		}
	}
}
</style>
