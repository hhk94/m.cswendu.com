<template>
	<div class="spacial-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="spacial" ref="wrapper">
			<div>
				<top-notice :alreadyTop="alreadyTop"></top-notice>
				<div class="spacial-center" >
					<img src="@/assets/img/spacial/spacial-2/1.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-2/2.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-2/3.jpg" alt="">
					<div class="table">
						<h1 class="title">
							<img src="@/assets/img/spacial/spacial-2/title.jpg" alt="">
						</h1>
						<div class="tabs">
							<div 
							@click="tabChange(index)"
							v-for="(item,index) of tabs"
							:key="index"
							:class="{'active':isActive==item.name,'tabs-item':true}" 
							>{{item.name}}</div>
						</div>
						<div class="table-center">
							<img :src="imgSrc" alt="">
						</div>
					</div>
					<!-- <img src="@/assets/img/spacial/spacial-2/4.jpg" alt=""> -->
					<img src="@/assets/img/spacial/spacial-2/5.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-2/6.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-2/7.jpg" alt="">
					
					<div class="form-body">
						<h1 class="title"><img src="@/assets/img/spacial/spacial-2/title2.jpg" alt=""></h1>
						<div class="form">
							<div class="center">
								<div class="type">
									<h1>姓名</h1>
									<input type="text" v-model="name">
								</div>
								<div class="type">
									<h1>电话</h1>
									<input type="text" v-model="phone">
								</div>
								<div class="type">
									<h1>QQ/微信</h1>
									<input type="text" v-model="qq">
								</div>
								<div class="submit" @click="submit()">点击提交</div>
							</div>
							
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
import {submit} from '@/api/User'
import { mapActions} from 'vuex'
// import {shareWx} from '@/api/Base'
export default {
	name:"Spacial2",
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
			name:'',
			phone:'',
			qq:'',
			timer: '',
			tabs:[
				{
					'name':'全科系列',
					'url':require('../../assets/img/spacial/spacial-2/qk.png')
				},
				{
					'name':'公共课系列',
					'url':require('../../assets/img/spacial/spacial-2/ggk.png')
				},
				{
					'name':'专业课系列',
					'url':require('../../assets/img/spacial/spacial-2/zyk.png')
				},
				{
					'name':'199管综系列',
					'url':require('../../assets/img/spacial/spacial-2/199.png')
				},
			],
			isActive:'全科系列',
			imgSrc:require('../../assets/img/spacial/spacial-2/qk.png'),
			scroll:null
		}
	},
	activated() {
		this.init()
		
	},
	watch:{
		$route(){
			this.scroll.scrollTo(0,0,1000) 
		}
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
		tabChange(index){
			this.isActive = this.tabs[index].name
			this.imgSrc = this.tabs[index].url
			
		},
		async init(){
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
			this.Scroll()
			this.updated()
			// this.shareWx()
		},
		// shareWx(){
		// 	window.g.title = '文都考研【官网】彩虹卡火热招生中'
		// 	window.g.description = '全日制辅导，班主任督学，考研就是要赢得漂亮！'
		// 	shareWx()
		// },
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
			console_log(this.scroll)
			// if(this.scroll.wrapperHeight ==this.scroll.scrollerHeight){
			// 	this.Scroll()
			// }
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
					// this.getspacialList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		
		submit(){
			if(this.name==''||this.name==null||this.name.length==0){
				this.$dialog.toast({
					mes: '请填写您的姓名',
					timeout: 1500,
					icon: 'error'
				});
				return false;
			}else if(this.phone==''||this.phone==null||this.phone.length==0){
				this.$dialog.toast({
					mes: '请填写您的联系电话',
					timeout: 1500,
					icon: 'error'
				});
				return false;
			}else{
				let isPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
				if(!isPhone.test(this.phone)){
					this.$dialog.toast({
						mes: '对不起，您的手机号格式不正确，请检查',
						timeout: 1500,
						icon: 'error'
					});
					return false;
				}else{
					// ajax
					this.submitAxios()
				}
			}
		},
		submitAxios(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				resource: 'mobile_spacial-彩虹卡',
				user_info: this.name+'#@'+this.qq,
				user_phone: this.phone
			}
			// console_log(id)
			new Promise((resolve, reject) => {
				submit(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('submit接口错误');
					}else if(response.state==1){
						this.$dialog.toast({
							mes: '报名成功！',
							timeout: 1500,
							icon: 'success'
						});
					}
					}).catch(error => {
						reject(error)
				})
			})
		}
		
	}
}
</script>

<style scoped lang="less">
.spacial-body{
	height: 100%;
}
.spacial{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.spacial-center{
		.table{
			width: 100%;
			background: #54b784;
			.title{
				width: 100%;
				
			}
			.tabs{
				width: @design-center;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.tabs-item{
					width: 25%;
					padding:0 0.1rem;
					font-size: 0.2rem;
					color: #2c6143;
					height: 0.4rem;
					line-height: 0.4rem;
					text-align: center;
					border-radius:0.05rem;
					&.active{
						font-size: 0.24rem;
						background:#fbea7d;
						color:#2c6143;
						font-weight:bold;
					}
				}
			}
		}
	}
	img{
		width: 100%;
	}
	.form-body{
		overflow: hidden;
		background: #54b784;
		.form{
			background: url("~@/assets/img/spacial/spacial-2/m-spacial-2-bg.png") no-repeat center center /contain;
			width: 6.14rem;
			height: 5.62rem;
			margin: 0 auto 2rem auto;
			overflow: hidden;
			.center{
				margin-top: 1.2rem;
				.type{
					width: 5.18rem;
					margin: 0.1rem auto;
					h1{
						font-size: 0.22rem;
						color: #0f0f0f;
					}
					input{
						width: 100%;
						display: block;
						height: 0.5rem;
						border-bottom: 1px solid #f3f3f6;
						font-size: 0.3rem;
					}
				}
				.submit{
					// touch-action: none;
					width: 5.14rem;
					height: 0.68rem;
					line-height: 0.68rem;
					background: #f6c952;
					color: white;
					font-size: 0.28rem;
					text-align: center;
					margin: 0.2rem auto 0 auto;
				}
			}
			
		}
	}

}
</style>
