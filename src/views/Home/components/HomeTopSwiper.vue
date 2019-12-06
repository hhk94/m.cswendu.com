<template>
	<div class="swiper-body">
		<div class="header">
			<div class="m-logo" @click="back()">
				<img src="@/assets/img/m-logo.png" alt="">
			</div>
			<div class="m-phone">
				<img src="@/assets/img/m-phone.png" alt="">
			</div>
		</div>
		<div class="swiper-center">
			<swiper :options="swiperOption">
				
				<swiper-slide 
				v-for="(item,index) of bannerList"
				:key="index"
				>
					<a :href="item.jump">
						<img :src="item.img" alt="">
					</a>
					
				</swiper-slide>
				
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		
	</div>
</template>

<script>
export default {
	name:'HomeTopSwiper',
	data() {
		return {
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true
				},
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
			}
		}
	},
	props:{
		bannerList:Array
	},
	methods:{
		back(){
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped lang="less">
.swiper-body{
	img{
		width: 100%;
	}
	position: relative;
	z-index: 3;
	width: 100%;
	height: 0;
	// overflow: hidden;
	padding-bottom: 51.5%;
	background: url('~@/assets/img/m-banner-bg.png') no-repeat center center /cover;
	.header{
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
	.swiper-center{
		width: @design-center;
		margin: 0.13rem auto 0 auto;
		// background:red;
		padding-bottom: 47%;
		border-radius: 0.3rem;
		overflow: hidden;
		box-shadow: 0 0 0.05rem 0.05rem @theme-color;
		height: 0;
		
	}
	h1{
		color: red;
	}
	a{
		display: block;
		
	}
	
}
</style>
