<template>
	<div class="download-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="download" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="download-top"></div>
				<div class="download-center">
					
					<div 
					@click="goToDetail(item.file_upload_id)"
					v-for="item of this.downloadList"
					:key="item.file_upload_id"
					class="download-item">
						<div class="img-box"><img src="@/assets/img/m-download-1.png" alt=""></div>
						<div class="word">
							<h1 class="word-title">{{item.file_zh_name}}</h1>
							<div class="btn-body">
									<h1>免费下载</h1>
									<div class="star">
										<span><img src="@/assets/img/m-download-3.png" alt=""></span>
										<span class="fen">4.9</span>
									</div>
									<div class="download-btn"><img src="@/assets/img/m-download-2.png" alt=""></div>
							</div>
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
import {getDwoanloadList} from '@/api/Download'
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
			downloadList:[]
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
		goToDetail(file_upload_id){
			this.$router.push({path:'/download-detail',query:{file_upload_id:file_upload_id}}).catch(err => {err})
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getDwoanloadList()
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
					this.getDwoanloadList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		
		getDwoanloadList(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				file_upload_id:'all',
				page:this.page,
				limit:this.limit
			}
			console_log(data)
			new Promise((resolve, reject) => {
				getDwoanloadList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getCourseList接口错误');
					}else if(response.state==1){
						const _list = response.content
						this.downloadList = [...this.downloadList, ..._list];
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
.download-body{
	height: 100%;
}
.download{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.download-top{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 35.1%;
		background: url('~@/assets/img/m-download-bg.png') no-repeat center center /cover;
	}
	.download-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		overflow: hidden;
		.download-item{
			overflow: hidden;
			border-bottom: 1px solid #efeeeb;
			height: 0;
			padding-bottom: 1.5rem;
			margin: 0.2rem 0;
			.img-box{
				float: left;
				width: 0.92rem;
				img{
					width: 100%;
				}
			}
			.word{
				float: left;
				width: calc(~"100% - 0.92rem");
				padding:0 0.3rem;
				.word-title{
					font-weight: bold;
					font-size: @tab-size;
					line-height: 0.3rem;
					color: #525252;
					text-align: left;
					.word-two-line;
				}
				.btn-body{
					margin-top: 0.4rem;
					display: flex;
					justify-content: space-between;
					h1{
						font-size: 0.2rem;
						color: #898989;
						
					}
					.star{
						overflow: hidden;
						span{
							&.fen{
								margin-top: 0.05rem;
							}
							font-size: 0.2rem;
							color: #898989;
							img{
								width: 100%;
							}
							float: left;
							width: 1.1rem;
						}
					}
					.download-btn{
						width: 0.29rem;
						img{
							width: 100%;
						}
					}
				}
			}
		}
	}
}
</style>
