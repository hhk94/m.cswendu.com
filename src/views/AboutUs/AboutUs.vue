<template>
	<div class="about-us-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="about-us" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="about-us-top"></div>
				<div class="about-us-center" >
					<div class="img-box"><img src="@/assets/img/m-about-us-1.jpg" alt=""></div>
					<div class="img-box"><img src="@/assets/img/m-about-us-2.jpg" alt=""></div>
					<div class="img-box"><img src="@/assets/img/m-about-us-3.jpg" alt=""></div>
					<div class="contact">
						<div><img src="@/assets/img/m-about-us-img1.png" alt=""></div>
						<div @click="tel('tel://15367826050')"><img src="@/assets/img/m-about-us-img2.png" alt=""></div>
					</div>
					<div class="img-box"><img src="@/assets/img/m-about-us-5.jpg" alt=""></div>
					<div class="img-box"><img src="@/assets/img/m-about-us-6.jpg" alt=""></div>
					<div class="img-box" @click="tel('tel://15364029727')"><img src="@/assets/img/m-about-us-7.jpg" alt=""></div>
					<div class="img-box" ><img src="@/assets/img/m-about-us-8.jpg" alt=""></div>
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
import { mapActions} from 'vuex'
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
// import store from '@/store'
// import {getTeacherClass,getTeacherList} from '@/api/Base'
export default {
	name:"HomeCourse",
	components:{
		DefaultHeader,
		TopNotice,
		BottomNotice
	},
	data (){
		return {
			scroll:null,
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'transparent'
			},
			headerName:'DefaultHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:true,

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

			this.Scroll()
			this.$nextTick(()=>{
				this.updated()
				
			})
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
						console_log(img[count])
						console_log(length)
						console_log(count)
					if (count == length) {
						// console_log('refresh')
						this.scroll.refresh()
						clearInterval(timer)
					} else if (img[count]) {
						if(img[count].complete){
							count ++
						}
					}else if(!img[count]){
						this.scroll.refresh()
						clearInterval(timer)
					}
					}, 100)
				}
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
					// this.getTeacherList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		tel(href){
			window.location.href=href
		}
	
	}
}
</script>

<style scoped lang="less">
.about-us-body{
	height: 100%;
}
.about-us{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.about-us-top{
		overflow: hidden;
		width: 100%;
		height: 0;
		padding-bottom: 35.1%;
		background: url('~@/assets/img/m-about-us-bg.png') no-repeat center center /cover;
	}
	.about-us-center{
		width: @design-center;
		margin: 0.2rem auto 0 auto;
		padding-bottom:0.5rem;
		.img-box{
			width: 100%;
			img{
				width: 100%;
			}
		}
		.contact{
			overflow: hidden;
			display: flex;
			justify-content: space-around;
			div{
				width: 2.56rem;
				img{
					width: 100%;
				}
			}
			div+div{
				width: 1.55rem;
			}
		}
		
	}
}
</style>
