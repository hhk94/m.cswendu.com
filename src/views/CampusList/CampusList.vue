<template>
	<div class="comment-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="comment" ref="wrapper">
			<div>
				<div class="comment-top"></div>
				<div class="comment-center">
					<div class="tabs">
						
						<div
						@click="tabChange(item.campus_class_name,item.campus_class_id)"
						:class="{'active':isActive==item.campus_class_name,'tab-item':true}"
						v-for="item of campusClass"
						:key="item.campus_class_id"
						>{{item.campus_class_name}}</div>
						
					</div>
					<div class="list">
						<div 
						v-for="item of campusList"
						:key="item.campus_id"
						class="list-item">
							<h1 class="title">
								{{item.campus_name}}
								<span @click="lookMap(item.campus_address,item.campus_name)">查看地图</span>
							</h1>
							<p>{{item.campus_address}}</p>
							<div class="tel" @click="tel('tel://15367826050')"><i class="fa fa-phone-square"></i>湖南二十四小时在线电话：153-6782-6050(点击拨打)</div>
						</div>
					</div>
					<bottom-notice :footer_bottom="footer_bottom"></bottom-notice>
				</div>
				
			</div>
			
		</div>
		<home-footer :alreadyTop="alreadyTop"></home-footer>
	</div>
	
</template>

<script>
import BScroll from 'better-scroll'
import BackHeader from '@/components/BackHeader'
import HomeFooter from '@/components/Footer'
import BottomNotice from '@/components/BottomNotice'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import {getCampusClass,getCampusList} from '@/api/Base'
export default {
	name:"HomeCourse",
	components:{
		BackHeader,
		HomeFooter,
		BottomNotice
	},
	data (){
		return {
			isActive:'全部',
			campusClass:[],
			campusList:[],
			scroll:null,
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				background:'transparent'
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			//列表参数
			page:1,
			limit:8,
			teacher_class_id:''
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		lookMap(address,name){
			this.$router.push({path:'/campus-detail',query:{address:address,name:name}}).catch(err => {err})
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getCampusClass()
			
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
					this.opacityStyle = {opacity:opacity,background: "#7abff7"}
					// console_log(this.opacityStyle)
					// this.showAbs = true
				}else{
					// this.showAbs = false
					// this.opacityStyle = {background: "transparent"}
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					this.getCampusList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		tabChange(item,id){
			this.isActive = item
			this.campus_class_id = id
			this.campusList = []
			this.page = 1
			this.footer_bottom = false
			this.scroll.finishPullUp()
			console_log(this.campusList )
			this.getCampusList()
		},
		//获取老师分类
		getCampusClass(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				campus_class_id: 'all'
			}
			new Promise((resolve, reject) => {
				getCampusClass(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCampusClass接口错误');
					}else if(response.state==1){
						this.campusClass = response.content
						this.campus_class_id = this.campusClass[0].campus_class_id
						this.isActive = this.campusClass[0].campus_class_name
						this.getCampusList()
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		getCampusList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				campus_class_id: this.campus_class_id,
				campus_id: 'that',
				page:this.page,
				limit:this.limit
			}
			console_log(data)
			new Promise((resolve, reject) => {
				getCampusList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.campusList = [...this.campusList, ..._list];
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						console_log(_list.length)
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
		tel(href){
			window.location.href=href
		},
	}
}
</script>

<style scoped lang="less">
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
		background: url('~@/assets/img/m-teacher-bg.png') no-repeat center center /cover;
	}
	.comment-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.tabs{
			width: 100%;
			display: flex;
			justify-content:flex-start;
			flex-wrap: wrap;
			.tab-item{
				font-size: @tab-size;
				color: @tab-color;
				padding: 0.3rem 0;
				width:20%;
				text-align: center;
				position: relative;
				&.active{
					color: @theme-color;
					&::after{
						position: absolute;
						content: '';
						display: block;
						left: 0;
						bottom: 0;
						width: 100%;
						height: 0.05rem;
						border-radius: 0.05rem;
						background: @theme-color;
					}
				}
			}
		}
		.list{
			margin-top: 0.2rem;
			margin-bottom: 0.1rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.list-item{
				width: 100%;
				border-bottom: 1px solid #e6e3df;
				// padding-bottom: 30%;
				// height: 0;
				margin-top: 0.2rem ;
				position: relative;
				.title{
					font-size: @tab-size;
					color: #525252;
					font-weight: bold;
					span{
						float: right;
						font-size: 0.2rem;
						color: @theme-color;
					}
				}
				p{
					margin-top: 0.2rem;
					width: 60%;
					font-size: @sec-title;
					line-height: 0.3rem;
					color: #898989;
				}
				.tel{
					width: 100%;
					// position: absolute;
					// left: 0;
					// bottom: 0;
					color: #ffa43f;
					font-size: @tab-size;
					padding: 0.2rem 0;
					line-height: 0.3rem;
					i{
						margin-right: 0.2rem;
					}
				}
			}
		}
	}
}
</style>
