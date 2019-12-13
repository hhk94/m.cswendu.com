<template>
	<div class="swiper-body">
		<div class="header">
			<div class="m-logo" @click="back()">
				<img src="@/assets/img/m-logo.png" alt="">
			</div>
			<div class="m-phone" @click="tel('tel://15367826050')">
				<img src="@/assets/img/m-phone.png" alt="">
			</div>
		</div>
		<div class="swiper-center" >
			<swiper :options="swiperOption" ref="mySwiper">
				
				<swiper-slide 
				:data_index="item.jump"
				v-for="(item,index) of bannerList"
				:key="index"
				>
					<a >
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
			},

		}
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	props:{
		bannerList:Array
	},
	methods:{
		back(){
			// this.$router.go(-1);
			this.$router.push({path:'/shouye'}).catch(err => {err})
		},
		tel(href){
			window.location.href=href
		},
	},

	mounted() {
		let _this = this;
		this.swiper.on('tap', function () {
			// _this.goToDetail(this.clickedSlide.getAttribute('data_index'));//调用你自定义的方法
			if(this.clickedSlide.getAttribute('data_index')=='qn'){
				_this.$router.push({path:'/spacial-1'}).catch(err => {err})
			}else{
				_this.$router.push({path:'/spacial-2'}).catch(err => {err})
			}
		})
	}
}
</script>

<style scoped lang="less">
.swiper-body{
	img{
		width: 101%;
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
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
	}
	h1{
		color: red;
	}
	a{
		display: block;
		
	}
	
}
</style>
