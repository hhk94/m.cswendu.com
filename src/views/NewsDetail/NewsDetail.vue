<template>
	<div class="news-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="news" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="news-center">
					<h1 class="title">{{this.news_info.title}}</h1>
					<div class="author">
						<div class="img-box"><img src="@/assets/img/m-news-detail-1.png" alt=""></div>
						<div class="word">
							<h1>{{this.news_info.author}}</h1>
							<h2>{{this.getTime(this.news_info.create_time)}}</h2>
						</div>
					</div>
					<div class="summary" v-html="this.news_info.content"></div>
					<div class="more">
						<h1 class="more-title">
							更多资讯
						</h1>
						<div class="news-list">
							
							<div class="list">
								<div
								@click.once="goToDetail(item.news_info_id,item.news_class_id_array)"
								v-for="item of classNewsList"
								:key="item.news_info_id"
								class="list-item">
									<div class="word">
										<h1>{{item.title}}</h1>
										<span>{{item.author}}</span>
									</div>
									<div class="img-pic"><img :src="item.http_img" alt=""></div>
								</div>
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
import { console_log,getTime } from "@/utils/base.js"
import store from '@/store'
import {getNewsList} from '@/api/Base'
import {getNewsDetail} from '@/api/NewsDetail'
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
				// background:'#7abff7'
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			//列表参数
			page:1,
			limit:4,
			news_info:{},
			news_info_id:'',
			classNewsList:[],
			timer: '',
		}
	},
	mounted(){
		var that = this;
		Utils.$on('toTop', function () {
		that.scrollToTop();
		})
	},
	activated() {
		// console_log('aS')
		this.init()
	},
	// beforeRouteEnter(to, from, next) {
		
	// 	next(vm => {
		
	// 	// 通过 `vm` 访问fetchData，将query参数name，传递过去，进行逻辑处理
	// 	vm.classNewsList = []
	// 	console_log(vm.$route);//有值
	// 	console_log(vm.$route.query.news_info_id)
	// 	// vm.fetchData(vm.$route.query.news_info_id);
	// 	vm.init()
	// 	});
	
	// },
	watch:{
		$route(newVal, oldVal){
			this.classNewsList = []
			console_log(oldVal); //oldVa 上一次url
			console_log(newVal); //newVal 这一次的url
			this.scroll.scrollTo(0,0,1000) 
			if (newVal != oldVal) {
				if(this.$route.path=="/news-detail"){
					this.init()
				}
			}
			// console_log('$route')
			// console_log(this.$route.query.news_info_id)
			
			
		}
	},
	
	deactivated(){
		// this.classNewsList = []
	},
	methods:{
		...mapActions("Home",['toTopShowOrHidden']),
		scrollToTop(){
			this.scroll.scrollTo(0,0,1000) 
		},
		async init(){
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
			
			let news_info_id = this.$route.query.news_info_id
			let class_id = this.$route.query.class_id_array
			
			let class_id_array = class_id.split("&")
			
			if(news_info_id!=this.news_info_id){
				this.getNewsDetail( news_info_id)
				// console_log("id")
				// console_log(news_info_id)
				// console_log("this.news_info_id")
				// console_log(this.news_info_id)
				
			}
			// console_log(class_id_array)
			class_id_array.forEach(item=>{
				item==""?'':this.getClassNews(item)
			})
			this.news_info_id = news_info_id
			
			this.Scroll()
			this.updated()
		},
		updated () {
			//解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
			//原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
			//利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
			let img = document.getElementsByTagName('img')
			let count = 0
			let length = img.length
			console_log(img)
			if(img){
				if (length) {
					let timer = setInterval(() => {
						// console_log(img[count])
					if (count == length) {
						// console_log('refresh')
						this.scroll.refresh()
						clearInterval(timer)
					} else if (img[count]) {
						if(img[count].complete){
							count ++
						}
						
					}
					}, 100)
				}
			}
			
			
		},
		getTime(time){
			return getTime(time)
			
		},
		goToDetail(id,class_id_array){
			console_log(id)
			console_log(this.news_info_id)
			
			if(id==this.news_info_id){
				this.$dialog.toast({
					mes: '为同一条资讯，请选择其他资讯查看',
					timeout: 1500,
					icon: 'error',
				});
			}else{
				this.$router.push({path:'/news-detail',query:{news_info_id:id,class_id_array:class_id_array}}).catch(err => {err})
			}
			
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
			// this.scroll.scrollTo(0,0,1000) 
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				// console_log(top )
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
		getNewsDetail(id){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				news_info_id: id
			}
			// console_log(id)
			new Promise((resolve, reject) => {
				getNewsDetail(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNewsDetail接口错误');
					}else if(response.state==1){
						
						this.news_info = response.content
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//获取此新闻对应分类下的新闻
		getClassNews(id){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				news_class_id:id,
				page:this.page,
				limit:this.limit
			}
			new Promise((resolve, reject) => {
				getNewsList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getClassNews接口错误');
					}else if(response.state==1){
						const _list = response.content
						_list.forEach((item,index)=>{
							if(item.cover!=''){
								_list[index].http_img = window.g.http+item.cover
							}
						})
						this.classNewsList = _list;
					
						this.$nextTick(() => {
							this.scroll.refresh(); // DOM 结构发生变化后，重新初始化BScroll
						})
						
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
.news-body{
	height: 100%;
}
.news{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	
	.news-center{
		width: @design-center;
		padding-top: 1rem;
		margin: 0 auto;
		padding-bottom:1rem;
		.title{
			font-size: 0.36rem;
			color: #323232;
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
		.summary{
			color: #525252;
			font-size: 0.3rem;
			line-height: 0.6rem;
			padding-bottom: 0.4rem;
			border-bottom: 1px solid #e6e3df;;
			/deep/img{
				width: 100%;
				height: auto;
			}
		}
		.more{
			.more-title{
				font-size: @title;
				color: #323232;
				font-weight: bold;
				margin-top: 0.3rem;
			}
			.news-list{
				width: @design-center;
				margin: 0.1rem auto 0 auto;
				
				padding-bottom: 0.5rem;
				.list{
					width: 100%;
					.list-item{
						// background: #0086B3;
						overflow: hidden;
						border-bottom: 1px solid #f0eeec;
						margin-bottom: 0.1rem;
						.word{
							position: relative;
							float: left;
							width: calc(~" 100% - 29% ");
							float: left;
							padding: 0 0.13rem 15.2% 0.13rem;
							height: 0;
							position: relative;
							// background: bisque;
							margin: 0.2rem 0;
							h1{
								font-size: @tab-size;
								color: #525252;
								.word-two-line;
								line-height: @sec-line-height;
							}
							span{
								position: absolute;
								right: 0.13rem;
								bottom: 0;
								font-size: @sec-title;
								color: #898989;
							}
						}
						.img-pic{
							overflow: hidden;
							margin: 0.2rem 0;
							float: left;
							width: 29%;
							height: 0;
							padding-bottom: 15.2%;
							img{
								width: 100%;
							}
							// background: red;
						}
					}
				}
			}
		}
	}
}
</style>
