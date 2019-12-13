<template>
	<div class="download-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="download" ref="wrapper">
			<div>
				<div class="download-center">
					<div class="center">
						<div class="img-box"><img src="@/assets/img/m-download-1.png" alt=""></div>
						<h1 class="title">{{this.download_info.file_zh_name}}</h1>
						<div class="down-btn" @click="judgeNav()">点击下载</div>
					</div>	
				</div>
				
				<transition
				enter-active-class="animated bounceInDown"
				leave-active-class="animated bounceOutLeft"
				:durantion="400"
				>
					
				
				<div class="form-black-bg" v-show="this.show_form" @click.self="hiddenBg()">
					<transition 
					leave-active-class="animated hinge"
					:durantion="400">
						<div class="form-body" v-show="this.show_form_form">
							<p style="margin-top: 0.3rem;">填写姓名电话之后，点击获取验证码</p>
							<div class="type">
								<h1>姓名</h1>
								<input type="text" v-model="name">
							</div>
							<div class="type">
								<h1>电话</h1>
								<input type="text" v-model="phone">
							</div>
							<div class="type check">
								<div>
									<h1>验证码</h1>
									<input type="text" v-model="check_code">
								</div>
								
								<div class="check-btn" @click.stop="getCode()" :class="{'check-btn':true,disabled:this.check_btn !='获取验证码'}">{{this.check_btn}}</div>
							</div>
							<p>填写信息立即领取下载链接</p>
							<div class="form-btn" @click.stop="submitUserInfo()">点击提交</div>
						</div>
					</transition>
					
					<div class="right-now" v-show="this.show_form_down">
						<div class="pdf"><i class="fa fa-file"></i></div>
						<h1>{{this.download_info.file_zh_name}}111111</h1>
						<div class="right-now-download" @click.stop="productHerf()"><i class="fa fa-download"></i>立即下载</div>
					</div>
					
				</div>
				
				</transition>
			</div>
			
		</div>
		<!-- <home-footer :alreadyTop="alreadyTop"></home-footer> -->
	</div>
	
</template>

<script>

import BackHeader from '@/components/BackHeader'
// import HomeFooter from '@/components/Footer'
//自定义公共js - own common css
import { console_log} from "@/utils/base.js"
import store from '@/store'

import {getFile,productHerf,getCode,submitUserInfo} from '@/api/Download'
export default {
	name:"downloadDetail",
	components:{
		BackHeader,
		// HomeFooter,
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
			download_info:{},
			file_upload_id:'',
			name:'',
			phone:'',
			check_code:'',//验证码
			check_btn:'获取验证码',//倒计时
			show_form:false,//阴影显示,
			show_form_form:true,//form表单显示
			show_form_down:false,//真实下载显示
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
			this.file_upload_id = this.$route.query.file_upload_id
			this.getFile()
			// this.Scroll()
		},
		//获取具体信息
		getFile(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				file_upload_id: this.file_upload_id
			}
			// console.log(id)
			new Promise((resolve, reject) => {
				getFile(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNewsDetail接口错误');
					}else if(response.state==1){

						this.download_info = response.content
						
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		hiddenBg(){
			this.show_form = false
		},
		checkInfo(){
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
					return true;
				}
			}
		},
		//获取验证码
		getCode(){
			const test = this.checkInfo()
			if(this.check_btn!="获取验证码"){
				return false;
			}
			if(test){
				let data ={
					user_token:store.getters.common_token,
					app_class:'mobile',
					resource: 'mobile_download',
					user_info: this.name+'#@'+this.download_info.file_zh_name,
					user_phone: this.phone
				}
				// console.log(id)
				new Promise((resolve, reject) => {
					getCode(data).then(response => {
						resolve(response)
						console_log(response)
						if(response.state==0){
							this.$message.error('getCode接口错误');
						}else if(response.state==1){
							this.$dialog.toast({
								mes: '短信验证码已下发至您的手机，请注意查收',
								timeout: 3000,
								icon: 'error'
							});
							//60s倒计时
							this.check_btn = 60
							let _this = this
							let timer = setInterval(function(){
								_this.check_btn = _this.check_btn-1
								console.log(_this.check_btn)
								if(_this.check_btn<=1){
									clearInterval(timer)
									_this.check_btn = '获取验证码'
								}
							},1000)
							
						}
						}).catch(error => {
							reject(error)
					})
				})
			}
		},
		//提交信息
		submitUserInfo(){
			const test = this.checkInfo()
			
			if(test){
				if(this.check_code==''||this.check_code==null||this.check_code.length==0){
					this.$dialog.toast({
						mes: '请填写验证码',
						timeout: 1500,
						icon: 'error'
					});
					return false;
				}
				let data ={
					user_token:store.getters.common_token,
					app_class:'mobile',
					resource: 'mobile_download',
					name: this.name+'#@'+this.download_info.file_zh_name,
					phone: this.phone,
					code: this.check_code
				}
				// console.log(id)
				new Promise((resolve, reject) => {
					submitUserInfo(data).then(response => {
						resolve(response)
						console_log(response)
						if(response.state==0){
							this.$message.error('submitUserInfo接口错误');
						}else if(response.state==1){
							this.$dialog.toast({
								mes: '信息验证成功，为您生成下载链接',
								timeout: 3000,
								icon: 'success'
							});
							this.show_form_form = false//form表单显示
							this.show_form_down = true//真实下载显示
					}
					}).catch(error => {
							reject(error)
					})
				})
			}
		},
		
		//制作下载链接
		productHerf(){
			let data ={
				user_token:store.getters.common_token,
				app_class:'mobile',
				file_upload_id: this.file_upload_id
			}
			// console.log(id)
			new Promise((resolve, reject) => {
				productHerf(data).then(response => {
					resolve(response)
					console_log(response)
					if(response.state==0){
						this.$message.error('getNewsDetail接口错误');
					}else if(response.state==1){
						window.location.href = response.content.file_url
						let a = document.createElement('a')
						a.href =response.content.file_url
						a.click();
						
					}
					}).catch(error => {
						reject(error)
				})
			})
		},
		//判断浏览器
		judgeNav(){
			// console.log(this.file_upload_id)
			var ua = navigator.userAgent;
			var isWeixin =  !!/MicroMessenger/i.test(ua);
			console.log(isWeixin)
			if(!isWeixin){
				
				this.$dialog.toast({
					mes: '浏览器正常，填写信息将为您下载',
					timeout: 3000,
					icon: 'success'
				});
				// this.productHerf()
				this.show_form = true
				if(this.show_form_down){
					this.show_form_form = false
				}else{
					this.show_form_form = true
				}
				
			}else{
				if(ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1){
					// isAndroid 
					this.$dialog.toast({
					mes: 'Android系统，填写信息将为您跳转默认浏览器下载',
					timeout: 3000,
					icon: 'success'
					});
					// this.productHerf()
					this.show_form = true
					if(this.show_form_down){
						this.show_form_form = false
					}else{
						this.show_form_form = true
					}
				}
				var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(isiOS){
					//iOS
					this.$dialog.toast({
						mes: 'iOS系统，请您在其他浏览器打开此页面',
						timeout: 3000,
						icon: 'error'
					});
				}
				
			}
			
		}
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
	background: url("~@/assets/img/m-download-bg-1.png") no-repeat center center /cover;
	.download-center{
		.center{
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			width: @design-center;
			padding-bottom: 3rem;
			height: 0;
			
			.img-box{
				width: 0.92rem;
				margin: 0 auto;
				img{
					width: 100%;
				}
			}
			.title{
				text-align: center;
				color: white;
				font-size: 0.36rem;
				text-decoration: underline;
				margin: 0.2rem 0;
				.word-two-line;
				line-height: 0.5rem;
			}
			.down-btn{
				font-size: 0.24rem;
				color: white;
				background: #4d8ffc;
				height: 0.6rem;
				line-height: 0.6rem;
				width: 5rem;
				border-radius: 0.1rem;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
	.form-black-bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.6);
		.form-body{
			width: @design-center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			background: white;
			border-radius: 0.2rem;
			.type{
				width: 80%;
				margin: 0.3rem auto 0 auto;
				h1{
					font-size: 0.28rem;
					color: @theme-color;
				}
				input{
					margin-top: 0.1rem;
					width: 100%;
					display: block;
					border-bottom: 1px solid #534b92;
					font-size: 0.28rem;
				}
				&.check{
					overflow: hidden;
					div{
						float: left;
						width: 60%;
					}
					.check-btn{
						border-radius: 0.1rem;
						width: 40%;
						float: right;
						height: 0.7rem;
						line-height: 0.7rem;
						color: white;
						background: #4d8ffc;
						// padding: 0 0.2rem;
						text-align: center;
						&.disabled{
							background: darkgrey;
						}
					}
				}
			}
			p{
				width: 80%;
				margin: 0.1rem auto 0 auto;
				position: relative;
				text-indent: 0.2rem;
				color: @theme-color;
				font-size: 0.22rem;
				&::after{
					position: absolute;
					content: "";
					display: block;
					width: 0.08rem;
					height: 0.08rem;
					background: @theme-color;
					border-radius: 0.08rem;
					left: 0;
					top: 0.08rem;
					
				}
			}
			.form-btn{
				width: 80%;
				margin: 0.1rem auto 0.3rem auto;
				height: 0.7rem;
				line-height: 0.7rem;
				background: #4d8ffc;
				color: white;
				border-radius: 0.1rem;
				text-align: center;
			}
		}
		.right-now{
			width: @design-center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			background: white;
			border-radius: 0.2rem;
			.pdf{
				width: 0.8rem;
				margin: 0.2rem auto;
				text-align: center;
				img{
					width: 100%;
				}
				i{
					font-size: 0.8rem;
					color: #ff5562;
					text-align: center;
				}
			}
			h1{
				padding: 0 0.2rem;
				font-size: 0.26rem;
			}
			.right-now-download{
				background:#4d8ffc; 
				width: 80%;
				height: 0.7rem;
				line-height: 0.7rem;
				color: white;
				margin: 0.2rem auto;
				text-align: center;
				border-radius: 0.1rem;
				i{
					margin-right: 0.1rem;
				}
			}
		}
	}
}
</style>
