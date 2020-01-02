<template>
	<div class="ask-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="ask" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="ask-center">
					<h1 class="title">{{this.ask_info.ask_title}}</h1>
					<div class="author">
						
						<div class="word">
							<h1>{{this.ask_info.ask_user_name}}</h1>
							<h2>{{this.getTime(this.ask_info.create_time)}}</h2>
							<span>{{this.ask_info.tag_name}}</span>
						</div>
					</div>
					<div class="ask-btn" @click="ask()">我要提问</div>
					<div class="summary" v-show="JSON.stringify(this.best_answer) != '{}'">
						<div class="img-box"><img src="@/assets/img/m-ask-detail-1.png" alt=""></div>
						<div class="author">
							<div class="img-box"><img src="@/assets/img/m-news-detail-1.png" alt=""></div>
							<div class="word">
								<h1>{{this.best_answer.answer_user_name}}</h1>
								<h2>{{this.getTime(this.best_answer.create_time)}}</h2>
							</div>
						</div>
						<div class="center" v-html="this.best_answer.answer_content"></div>
					</div>
					<div 
					v-for="item of other_answer"
					:key="item.ask_question_id"
					class="other">
						<div class="img-box"><img src="@/assets/img/m-ask-detail-2.png" alt=""></div>
						<div class="other-item">
							<div class="author-other">
								<div class="img-box"><img src="@/assets/img/m-news-detail-1.png" alt=""></div>
								<div class="word">
									<h1>{{item.answer_user_name}}</h1>
									<!-- <h2>{{this.getTime(item.create_time)}}</h2> -->
								</div>
							</div>
							<div class="center" v-html="item.answer_content"></div>
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
import BackHeader from '@/components/BackHeader'
import TopNotice from '@/components/TopNotice'
import BottomNotice from '@/components/BottomNotice'
//自定义公共js - own common css
import { console_log,getTime } from "@/utils/base.js"
import store from '@/store'
import { mapActions} from 'vuex'
import {getAskDetail,getAnswerList} from '@/api/AskDetail'
export default {
	name:"HomeCourse",
	components:{
		BackHeader,
		TopNotice,
		BottomNotice
	},
	data (){
		return {
			isActive:'全部',
			teacherClass:[],
			teacherList:[],
			scroll:null,
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'#7abff7'
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			//列表参数
			page:1,
			limit:4,
			ask_info:{},
			ask_question_id:'',
			other_answer:[],
			best_answer:{}
		}
	},
	mounted(){
		var that = this;
		Utils.$on('toTop', function () {
		that.scrollToTop();
		})
	},
	activated(){
		this.init()
		console_log('activated')
	},
	deactivated(){
		this.other_answer = []
		this.best_answer = {}
		this.ask_info = {}
		
	},
	methods:{
		...mapActions("Home",['toTopShowOrHidden']),
		scrollToTop(){
			this.scroll.scrollTo(0,0,1000) 
		},
		getTime(time){
			
			return getTime(time)
			
		},
		ask(){
			window.location.href = window.g.kf53
		},
		async init(){
			
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
			let ask_question_id = this.$route.query.ask_question_id
			this.getAskDetail(ask_question_id)
			this.getAnswerList(ask_question_id)
			this.ask_question_id = ask_question_id
			console_log('init')
			// this.$nextTick(() => {
				
			// });
			this.Scroll()
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
		getAskDetail(id){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				ask_question_id: id
			}
			// console_log(id)
			new Promise((resolve, reject) => {
				getAskDetail(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getAskDetail接口错误');
					}else if(response.state==1){
						
						this.ask_info = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		getAnswerList(id){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				ask_question_id: id
			}
			// console_log(id)
			new Promise((resolve, reject) => {
				getAnswerList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getAskDetail接口错误');
					}else if(response.state==1){
						if(response.content.best_answer.length!=0){
							this.best_answer = response.content.best_answer[0]
						}
						this.other_answer = response.content.other_answer
						console_log(this.other_answer)
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
.ask-body{
	height: 100%;
}
.ask{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	
	.ask-center{
		width: @design-center;
		padding-top: 1rem;
		margin: 0 auto;
		padding-bottom:1rem;
		.title{
			font-weight: bold;
			line-height: 0.44rem;
			font-size: 0.36rem;
			color: #323232;
		}
		.author{
			margin: 0.2rem 0;
			overflow: hidden;
			padding-bottom: 0.2rem;
			border-bottom:1px solid #e6e3df;
			.word{
				margin-left: 0.2rem;
				margin-top: 0.1rem;
				
				h1{
					text-align: center;
					font-size: 0.24rem;
					color: @theme-color;
				}
				h2{
					text-align: center;
					font-size: 0.18rem;
					color: #898989;
				}
				span{
					float: right;
					padding: 0.1rem 0.2rem;
					background: @theme-color;
					color: white;
					border-radius: 0.05rem;
				}
			}
		}
		.ask-btn{
			background: rgb(6,209,145);
			width: 1.6rem;
			height: 0.6rem;
			line-height: 0.6rem;
			color: white;
			font-size: 0.32rem;
			margin: 0.1rem auto;
			text-align: center;
			border-radius: 0.1rem;
		}
		.summary{
			border-bottom: 1px solid #e6e3df;
			padding-bottom: 0.3rem;
			.center{
				line-height: 0.4rem;
				font-size: @tab-size;
				/deep/img{
					width: 100%;
					height: auto;
				}
			}
			.img-box{
				width: 1.5rem;
				img{
					width: 100%;
				}
			}
			.author{
				margin: 0.2rem 0;
				overflow: hidden;
				padding-bottom: 0.2rem;
				border-bottom:1px solid #e6e3df;
				.img-box{
					float: left;
					width: 0.6rem;
					height: 0.6rem;
					border-radius: 0.6rem;
					img{
						width: 100%;
					}
				}
				.word{
					margin-left: 0.2rem;
					margin-top: 0.1rem;
					float: left;
					h1{
						font-size: 0.24rem;
						color: @theme-color;
					}
					h2{
						font-size: 0.18rem;
						color: #898989;
					}
				}
			}
		}
		.other{
			margin-top: 0.4rem;
			.img-box{
				width: 1.06rem;
				img{
					width: 100%;
				}
			}
			.other-item{
				.author-other{
					margin: 0.2rem 0;
					overflow: hidden;
					padding-bottom: 0.2rem;
					.img-box{
						float: left;
						width: 0.6rem;
						height: 0.6rem;
						border-radius: 0.6rem;
						img{
							width: 100%;
						}
					}
					.word{
						margin-left: 0.2rem;
						margin-top: 0.1rem;
						float: left;
						h1{
							font-size: 0.24rem;
							color: @theme-color;
						}
						h2{
							font-size: 0.18rem;
							color: #898989;
						}
					}
				}
			}
		}
	}
}
</style>
