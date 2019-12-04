<template>
	<div class="footer">
		<div 
		@click="itemClick('shouye')" 
		:class="{'footer-item':true,choose:this.$store.state.Home.default_footer_choose=='shouye'}">
			<i class="iconfont icon-shouye"></i>
			<p>首页</p>
		</div>
		<div
		@click="itemClick('kecheng')"
		:class="{'footer-item':true,choose:this.$store.state.Home.default_footer_choose=='kecheng'}">
			<i class="iconfont icon-kecheng"></i>
			<p>课程</p>
		</div>
		<div
		@click="itemClick('kefu')"
		:class="{'footer-item':true,'footer-item-center':true,choose:this.$store.state.Home.default_footer_choose=='kefu'}">
			<i class="iconfont icon-kefu"></i>
			
		</div>
		<div
		@click="itemClick('zixun')"
		:class="{'footer-item':true,choose:this.$store.state.Home.default_footer_choose=='zixun'}">
			<i class="iconfont icon-zixundianji"></i>
			<p>资讯</p>
		</div>
		<div 
		@click="itemClick('wode')"
		:class="{'footer-item':true,choose:this.$store.state.Home.default_footer_choose=='wode'}">
			<i class="iconfont icon-wode"></i>
			<p>关于我们</p>
		</div>
	</div>
</template>

<script>
import '@/assets/iconfont/iconfont.css'
export default {
	name:'HomeFooter',
	data() {
		return {
			
		}
	},
	methods:{
		itemClick(item){
			this.$store.dispatch('Home/footerClick',item);
			console.log(this.$store.state.Home.default_footer_choose)
			
		}
	}
}
</script>

<style scoped lang="less">
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0 0 0.2rem 0.02rem @theme-color;
	height: 0.8rem;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	.footer-item{
		color: #d1e5fe;
		width: 20%;
		i{
			padding-top: 0.07rem;
			font-size: 0.4rem;
			display: block;
			text-align: center;
		}
		p{
			padding-top: 0.02rem;
			font-size: 0.16rem;
			text-align: center;
		}
		&.choose{
			color: @theme-color;
		}
	}
	.footer-item-center{
		position: relative;
		i{
			padding-top:0;
			margin-top: -0.07rem;
			font-size: 0.8rem;
		}
		&::after{
			display: block;
			position: absolute;
			content: "";
			top: -0.2rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: -1;
			width: 1rem;
			height: 1rem;
			background: url('~@/assets/img/m-footer-bg.png') no-repeat center center /cover;
		}
	}
}
</style>
