<template>
	<div class="spacial-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="spacial" ref="wrapper">
			<div>
				<div class="spacial-center" >
					<img src="@/assets/img/spacial/spacial-1/1.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-1/2.jpg" alt="">
					<img src="@/assets/img/spacial/spacial-1/3.jpg" alt="">
					<!-- <img src="@/assets/img/spacial/spacial-1/4.jpg" alt=""> -->
					<img src="@/assets/img/spacial/spacial-1/5.jpg" alt="">
					
					<div class="form-body">
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
		<home-footer :alreadyTop="alreadyTop"></home-footer>
	</div>
	
</template>

<script>

import BackHeader from '@/components/BackHeader'
import HomeFooter from '@/components/Footer'
//自定义公共js - own common css
import { console_log} from "@/utils/base.js"
import store from '@/store'
import BScroll from 'better-scroll'
import {submit} from '@/api/User'
export default {
	name:"spacial1",
	components:{
		BackHeader,
		HomeFooter,
	},
	data (){
		return {
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				background:'#7abff7'
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
		}
	},
	activated() {
		this.init()
		
	},
	methods:{
		async init(){
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
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
			if (length) {
			let timer = setInterval(() => {
			if (count == length) {
			// console_log('refresh')
			this.scroll.refresh()
			clearInterval(timer)
			} else if (img[count].complete) {
			count ++
			}
			}, 100)
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
					//empty
				}else{
					//empty
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
				resource: 'mobile_spacial-全年营',
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
.spacial{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.spacial-center{
		// padding-bottom: 110vh;
		// min-height: 110vh;
	}
	img{
		width: 100%;
	}
	.form-body{
		background: #ffc904;
		overflow: hidden;
		.form{
			background: url("~@/assets/img/spacial/spacial-1/m-spacial-1-bg.png") no-repeat center center /contain;
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
					width: 5.14rem;
					height: 0.68rem;
					line-height: 0.68rem;
					background: #ff700f;
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
