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

import {getFile,productHerf} from '@/api/Download'
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
				background:'#7abff7'
			},
			background:{
				background:''
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			download_info:{},
			file_upload_id:''
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
		judgeNav(){
			// console.log(this.file_upload_id)
			var ua = navigator.userAgent;
			var isWeixin =  !!/MicroMessenger/i.test(ua);
			console.log(isWeixin)
			if(!isWeixin){
				
				this.$dialog.toast({
					mes: '浏览器正常，即将为您下载',
					timeout: 1500,
					icon: 'success'
				});
				this.productHerf()
			}else{
				if(ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1){
					// isAndroid 
					this.$dialog.toast({
					mes: 'Android系统，即将为您跳转默认浏览器下载',
					timeout: 1500,
					icon: 'success'
					});
					this.productHerf()
				}
				var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(isiOS){
					//iOS
					this.$dialog.toast({
						mes: 'iOS系统，请您在其他浏览器打开下载',
						timeout: 1500,
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
}
</style>
