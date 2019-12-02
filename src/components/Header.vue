<template>
	<div class="header" 
	v-show="showAbs"
	:style="opacityStyle">
		<div class="header-body">
			<div class="m-logo">
				<img src="@/assets/img/m-logo.png" alt="">
			</div>
			<div class="m-phone">
				<img src="@/assets/img/m-phone.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name:'HomeHeader',
	data() {
		return {
			showAbs:false,
			opacityStyle:{
				opacity:0	
			}
		}
	},
	mounted(){
		window.addEventListener('scroll',this.scroll)
	},
	destroyed() {
		window.removeEventListener('scroll',this.scroll)
	},
	methods:{
		scroll(){
			console.log('a')
			const top = document.documentElement.scrollTop
			if(top>60){
				let opacity = top/140
				opacity = opacity>1?1:opacity
				this.opacityStyle = {opacity}
				this.showAbs=true
			}else{
				this.showAbs=false
			}
		}
	}
}
</script>

<style scoped lang="less">
.header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 0.7rem;
	z-index: 100;
	img{
		width: 100%;
	}
	background: @theme-color;
	.header-body{
		overflow: hidden;
		.m-logo{
			float: left;
			width: 1.65rem;
			margin-top: 0.13rem;
			margin-left: 0.2rem;
		}
		.m-phone{
			margin-top: 0.13rem;
			margin-right: 0.2rem;
			float: right;
			width: 2.35rem;
		}
	}
}
</style>
