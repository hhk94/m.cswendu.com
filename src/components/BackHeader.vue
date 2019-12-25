<template>
	<div class="header header2" >
		<div class="header-body">
			<div class="m-back" @click="back()">
				<img src="@/assets/img/m-back.png" alt="">
			</div>
			<div class="m-logo" @click="home()">
				<img src="@/assets/img/m-logo.png" alt="">
			</div>
		</div>
	</div>

	
</template>

<script>

export default {
	name:'HomeHeader',
	data() {
		return {
			
		}
	},
	props:{
		// headerName:String
	},
	mounted(){
		
	},
	destroyed() {
		
	},
	methods:{
		back(){
			this.$router.go(-1);
		},
		home(){
			this.$router.push({path:'/shouye'}).catch(err => {err})
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
		position: relative;
		overflow: hidden;
		.m-back{
			float: left;
			width: 0.24rem;
			margin-top: 0.13rem;
			margin-left: 0.2rem;
		}
		.m-logo{
			position: absolute;
			width: 1.65rem;
			top: 0.13rem;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}
</style>
