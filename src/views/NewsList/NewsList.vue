<template>
	<div class="news-list-father">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"
		></component>
		<div class="news-list-body" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>	
				<home-top-swiper :bannerList="bannerList" v-if="hasSwiper && isKeep"></home-top-swiper>
				<div class="news-list">
					
					<div class="list">
						<div
						@click="goToDetail(item.news_info_id,item.news_class_id_array)"
						v-for="item of allNewsList"
						:key="item.news_info_id"
						class="list-item">
							<div class="word">
								<h1>{{item.title}}</h1>
								<span>{{item.author}}</span>
							</div>
							<div class="img-pic"><img  v-lazy="item.http_img" alt=""></div>
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
import {getNewsList } from '@/api/Base'
import HomeTopSwiper from '../Home/components/HomeTopSwiper'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import { mapActions} from 'vuex'
export default {
	name:"NewsList",
	components:{
		DefaultHeader,
		HomeTopSwiper,
		TopNotice,
		BottomNotice
	},
	data(){
		return{
			hasSwiper:false,
			bannerList:[],
			allNewsList:[],
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
			limit:7,
			footer_bottom:false,
			isKeep:false,//解决keep-alive切换 swiper loop问题
		}
	},
	mounted() {
		this.init()
		var that = this;
		Utils.$on('toTop', function () {
		that.scrollToTop();
		})
	},
	activated() {
		// console.log('swiper')
		this.isKeep = true
	},
	deactivated() {
		this.isKeep = false
	},
	methods:{
		...mapActions("Home",['toTopShowOrHidden']),
		scrollToTop(){
			this.scroll.scrollTo(0,0,1000) 
		},
		goToDetail(id,class_id_array){
			
			this.$router.push({path:'/news-detail',query:{news_info_id:id,class_id_array:class_id_array}}).catch(err => {err})
		},
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			this.getBanner()
			this.getAllNews()
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
				if(top>60){
					let opacity = top/140
					opacity = opacity>1?1:opacity
					// this.opacityStyle = {opacity}
					this.opacityStyle = {opacity:opacity}
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
					this.getAllNews()
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
						this.bannerList.forEach((item,index)=>{
							if(item.img!=''){
								this.bannerList[index].http_img = window.g.http+item.img
							}
						})
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
		//获取所有新闻 - 上拉加载
		getAllNews(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				page:this.page,
				limit:this.limit
			}
			new Promise((resolve, reject) => {
				getNewsList(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNews接口错误');
					}else if(response.state==1){
						const _list = response.content
						_list.forEach((item,index)=>{
							if(item.cover!=''){
								_list[index].http_img = window.g.http+item.cover
							}
						})
						this.allNewsList = [...this.allNewsList, ..._list];
					
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

<style  scoped lang="less">
.news-list-father{
	height: 100%;
}
.news-list-body{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.news-list{
		width: @design-center;
		margin: 0.3rem auto 0 auto;
		margin-top: 0.7rem;;
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
					padding: 0 0.13rem 21.2% 0.13rem;
					height: 0;
					position: relative;
					// background: bisque;
					margin: 0.2rem 0;
					h1{
						font-weight: bold;
						font-size: @tab-size;
						color: #131313;
						.word-two-line;
						line-height: @sec-line-height;
					}
					span{
						position: absolute;
						right: 0.13rem;
						bottom: 0;
						font-size: 0.16rem;
						color: #898989;
					}
				}
				.img-pic{
					margin: 0.2rem 0;
					float: left;
					width: 29%;
					height: 0;
					padding-bottom: 16.2%;
					img{
						width: 100%;
					}
					// background: red;
				}
			}
		}
	}
}
</style>
