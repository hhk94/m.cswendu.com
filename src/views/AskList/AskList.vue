<template>
	<div class="ask-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="ask" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="ask-top"></div>
				<div class="ask-center">
					<div 
					@click="goToDetail(item.ask_question_id)"
					v-for="item of questionList"
					:key="item.ask_question_id"
					class="list-item">
						
						<div class="ask-center-body">
							<span class="ask-slog">问答</span>
							<span class="ask-name">{{item.ask_title}}</span>
							
						</div>
						<div class="summary" v-html="item.ask_description"></div>
						<!-- <h2>{{item.tag_name}}</h2> -->
						<div class="last">
							<h2>提问人：{{item.ask_user_name}}</h2>
							<h2 class="tag">{{item.tag_name}}</h2>
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
import { console_log } from "@/utils/base.js"
import store from '@/store'
import {getQuestionList } from '@/api/Base'
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
			questionList:[],
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
			page:1,
			limit:8
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
		goToDetail(id){
			console_log(id)
			this.$router.push({path:'/ask-detail',query:{ask_question_id:id}}).catch(err => {err})
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getQuestionList()
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
				click: true
			})
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				// console_log(this.alreadyTop)
				if(top>60){
					let opacity = 1
					opacity = opacity>1?1:opacity
					this.opacityStyle = {opacity:opacity}
					this.toTopShowOrHidden(true)
				}else{
					this.toTopShowOrHidden(false)
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					this.getQuestionList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		//获取评论
		getQuestionList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				ask_question_id: "all",
				page:this.page,
				limit:this.limit
			}
			new Promise((resolve, reject) => {
				getQuestionList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getQuestionList接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.questionList  = [...this.questionList , ..._list];
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						if (_list.length < this.limit||this.limit*this.page>=response.paging.total ) {
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
	.ask-top{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 35.1%;
		background: url('~@/assets/img/m-ask-bg.png') no-repeat center center /cover;
	}
	.ask-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.list-item{
			position: relative;
			border-bottom: 1px solid #e6e3df;
			padding-bottom: 0.2rem;
			margin-bottom: 0.2rem;
			.ask-center-body{
				margin-bottom: 0.1rem;
				overflow: hidden;
				.ask-slog{
					float: left;
					// display: inline-block;
					font-size: 0.2rem;
					color: white;
					height: 0.4rem;
					line-height: 0.4rem;
					background:@theme-color;
					padding: 0 0.1rem;
					border-radius: 0.1rem;
				}
				.ask-name{
					float: left;
					width: 80%;
					margin: 0 0.1rem;
					font-size: @title;
					color: #a3a3a3;
					line-height: 0.4rem;
				}
				
			}
			.summary{
				
				font-size: @tab-size;
				line-height: 0.4rem;
				color: #898989;
				p{
					margin: 0.02rem 0;
				}
			}
			h2{
				font-size: 0.2rem;
				color: #898989;
				
			}
			.last{
				margin-top: 0.1rem;
				display: flex;
				justify-content: space-between;
				.tag{
					background: @theme-color;
					height: 0.3rem;
					line-height: 0.3rem;
					padding: 0 0.1rem;
					border-radius: 0.06rem;
					color: white;
				}
			}
		}
	}
}
</style>
