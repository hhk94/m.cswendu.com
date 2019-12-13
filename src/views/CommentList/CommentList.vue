<template>
	<div class="comment-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="comment" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="comment-top"></div>
				<div class="comment-center">
					<div 
					v-for="item of commentList"
					:key="item.course_comment_id"
					class="list-item">
						
						<div class="comment-center-body">
							<span class="comment-slog">口碑</span>
							<span class="comment-name">{{item.user_name}}：</span>
							<span class="summary">{{item.comment}}</span>
						</div>
						<h2>报名课程：{{item.course_name}}</h2>
						<div class="last">
							<h2>校区：{{item.campus_name}}</h2>
							<h2><i class="fa fa-clock-o"></i>{{item.create_time}}</h2>
						</div>
						
						
					</div>
					
					<bottom-notice :footer_bottom="footer_bottom"></bottom-notice>
				</div>
				
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
import BScroll from 'better-scroll'
import BackHeader from '@/components/BackHeader'
import TopNotice from '@/components/TopNotice'
import BottomNotice from '@/components/BottomNotice'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import {getComment } from '@/api/Base'
export default {
	name:"HomeCourse",
	components:{
		BackHeader,
		TopNotice,
		BottomNotice
	},
	data (){
		return {
			commentList:[],
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
	},
	methods:{
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getComment()
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
				console.log(this.alreadyTop)
				if(top>60){
					let opacity = 1
					opacity = opacity>1?1:opacity
					this.opacityStyle = {opacity:opacity}
					// console.log(this.opacityStyle)
					// this.showAbs = true
				}else{
					// this.showAbs = false
					// this.opacityStyle = {background: "transparent"}
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					this.getComment()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		//获取评论
		getComment(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				course_comment_id:'all',
				page:this.page,
				limit:this.limit
			}
			new Promise((resolve, reject) => {
				getComment(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getComment接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.commentList  = [...this.commentList , ..._list];
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						if (_list.length < this.limit ||this.limit*this.page>=response.paging.total) {
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
.comment-body{
	height: 100%;
}
.comment{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.comment-top{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 35.1%;
		background: url('~@/assets/img/m-comment-bg.png') no-repeat center center /cover;
	}
	.comment-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.list-item{
			position: relative;
			border-bottom: 1px solid #e6e3df;
			padding-bottom: 0.2rem;
			margin-bottom: 0.2rem;
			.comment-center-body{
				margin-bottom: 0.3rem;
				.comment-slog{
					display: inline-block;
					font-size: @tab-size;
					color: white;
					height: 0.4rem;
					line-height: 0.4rem;
					background:@theme-color;
					padding: 0 0.1rem;
					border-radius: 0.1rem;
				}
				.comment-name{
					margin: 0 0.1rem;
					font-size: @tab-size;
					color: #a3a3a3;
				}
				.summary{
					text-indent: 0.2rem;
					font-size: @tab-size;
					color: #525252;
					line-height: 0.4rem;
				}
			}
			h2{
				font-size:@sec-title;
				color: #898989;
				
			}
			.last{
				margin-top: 0.1rem;
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>
