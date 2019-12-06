<template>
	<div class="tabs">
		<div class="tabs-top"></div>
		<div class="tabs-body">
			<div class="tabs-item" 
			v-for="(item,index) of iconList" 
			:key="index"
			@click="RouterPush(item)"
			>
				<div class="icon-img"><img :src="item.src" alt=""></div>
				<h1 class="h1">{{item.desc}}</h1>
				
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
import { console_log } from "@/utils/base.js"
export default {
	name:'HomeTabs',
	data() {
		return {
			iconList:[
				{
					desc:'热报课程',
					path:'/hot-course',
					src:require('../../../assets/img/m-home-icon-1.png')
				},
				{
					desc:'真题资料',
					path:'/dwonload',
					src:require('../../../assets/img/m-home-icon-2.png')
				},
				{
					desc:'考研问答',
					path:'/ask-list',
					src:require('../../../assets/img/m-home-icon-3.png')
				},	
				{
					desc:'口碑评价',
					path:'/comment-list',
					src:require('../../../assets/img/m-home-icon-4.png')
				},
				{
					desc:'考研课程',
					path:'/course-list',
					src:require('../../../assets/img/m-home-icon-5.png')
				},
				
				{
					desc:'文都名师',
					path:'/teacher-list',
					src:require('../../../assets/img/m-home-icon-7.png')
				},
				{
					desc:'校区地址',
					path:'/campus-list',
					src:require('../../../assets/img/m-home-icon-9.png')
				},
				{
					desc:'关于我们',
					path:'/about-us',
					src:require('../../../assets/img/m-home-icon-8.png')
				},
			]
		}
	},
	methods:{
		RouterPush(item){
			console_log(item)
			this.$router.push({path:item.path,query:{id:item.id}})
		}
	}
}
</script>

<style scoped lang="less">

.tabs{
	position: relative;
	width: 100%;
	margin-top: -0.3rem;
	z-index: 2;
	background: white;
	
	.tabs-top{
		background:white;
		height: 0.3rem;
		border-top-left-radius: 500%;
		border-top-right-radius: 500%;
	}
	.tabs-body{
		margin-top: 0.8rem;
		width: 100%;
		height: 0;
		padding-bottom: 50%;
		background: white;
		overflow: hidden;
		
	}
	.tabs-item{
		width: 25%;
		height: 0;
		padding-bottom:25%;
		// background: red;
		float: left;
		position: relative;
		.icon-img{
			color:red;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			font-size: 1rem;
			text-align: center;
			bottom: 0.44rem;
			line-height: 1.44rem;
			box-sizing: border-box;
			padding: 0.1rem;
			img{
				height: 100%;
				display: block;
				margin: 0 auto;
			}
		}
		h1{
			font-size:@tab-size;
			text-align: center;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: .44rem;
			line-height: .44rem;
			color: @icon-color;
		}
	}
}
</style>
