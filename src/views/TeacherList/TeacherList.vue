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
					<div class="tabs">
						<div
						:class="{'active':isActive=='全部','tab-item':true}" 
						@click="tabChange('全部',null)">全部</div>
						<div
						@click="tabChange(item.class_name,item.teacher_class_id)"
						:class="{'active':isActive==item.class_name,'tab-item':true}"
						v-for="item of teacherClass"
						:key="item.teacher_class_id"
						>{{item.class_name}}</div>
						
					</div>
					<div class="list">
						<div 
						@click="goToDetail(item.teacher_id)"
						v-for="item of teacherList"
						:key="item.teacher_id"
						
						class="list-item">
							<div class="img-box"><img  v-lazy="item.teacher_cover" alt=""></div>
							<p>{{item.teacher_name}}</p>
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
import {getTeacherClass,getTeacherList} from '@/api/Base'
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
			isActive:'全部',
			teacherClass:[],
			teacherList:[],
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
			footer_bottom:false,
			//列表参数
			page:1,
			limit:8,
			teacher_class_id:''
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
			this.$router.push({path:'/teacher-detail',query:{teacher_id:id}}).catch(err => {err})
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getTeacherClass()
			this.getTeacherList()
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
					this.getTeacherList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		tabChange(item,id){
			this.isActive = item
			this.teacher_class_id = id
			this.teacherList = []
			this.page = 1
			this.footer_bottom = false
			this.scroll.finishPullUp()
			console_log(this.teacherList )
			this.getTeacherList()
		},
		//获取老师分类
		getTeacherClass(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				teacher_class_id: 'all'
			}
			new Promise((resolve, reject) => {
				getTeacherClass(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getTeacherClass接口错误');
					}else if(response.state==1){
						this.teacherClass = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		getTeacherList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				teacher_class_id: this.teacher_class_id,
				teacher_id: 'all',
				page:this.page,
				limit:this.limit
			}
			console_log(data)
			new Promise((resolve, reject) => {
				getTeacherList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.teacherList = [...this.teacherList, ..._list];
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
		background: url('~@/assets/img/m-teacher-bg.png') no-repeat center center /cover;
	}
	.comment-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.tabs{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.tab-item{
				font-size: @tab-size;
				color: @tab-color;
				padding: 0.3rem 0;
				// width: 20%;
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
				width: 48.4%;
				padding: 2%;
				box-shadow: 0 0 0.1rem 0.01rem @theme-color;
				overflow: hidden;
				border-radius: 0.2rem;
				margin: 0.1rem 0;
				.img-box{
					width: 100%;
					padding-bottom: 128.6%;
					background: red;
					overflow: hidden;
					height: 0;
					img{
						width: 100%;
					}
				}
				p{
					margin: 0.1rem 0;;
					text-align: center;
					color: @tab-color;
					font-size: @tab-size;
				}
			}
		}
	}
}
</style>
