<template>
	<div class="home-hot">
		<div class="hot-tab">
			<div  :class="{'active':isActive=='zixun','hot-tab-item':true}" @click="tabChange('zixun')">考研资讯</div>
			<div :class="{'active':isActive=='shequ','hot-tab-item':true}" @click="tabChange('shequ')">考研社区</div>
		</div>
		<div class="hot-center">
			<div class="center-body" v-if="isActive=='zixun'">
				<swiper :options="swiperOption">
					<swiper-slide 
					v-for="(item,index) of this.pages"
					:key="index">
						<p class="center-list"
						v-for="(item2) of item"
						:key="item2.news_info_id"
						@click="newsRouter(item2.news_info_id)"
						>{{item2.title}}</p>
					</swiper-slide>
					
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="center-body" v-if="isActive=='shequ'">
				<p class="center-list"
				v-for="(item,index) of this.questionList"
				:key="index"
				@click="questionRouter(item.ask_question_id)"
				>{{item.ask_title}}</p>
				
			</div>
		</div>
	</div>
</template>

<script>
import { console_log } from "@/utils/base.js"
export default {
	name:'HomeHot',
	props:{
		newsList:Array,
		questionList:Array
	},
	data() {
		return {
			isActive:'',
			swiperOption: {
				pagination: {
					el: '.swiper-pagination',
					dynamicBullets: true
				}
			},
			pages:[]
		}
	},
	watch:{
		newsList(){
			this.newsList.forEach((item,index)=>{
				const page = Math.floor(index/4)
				if(!this.pages[page]){
					this.pages[page] = []
				}
				this.pages[page].push(item)
			})
			this.isActive = 'zixun'
			console_log(this.pages)
		},
	},
	mounted(){
		
	},
	
	
	methods:{
		tabChange(item){
			this.isActive = item
		},
		newsRouter(news_info_id){
			this.$router.push({path:"/news-list",query:{news_info_id:news_info_id}})
		},
		questionRouter(ask_question_id){
			this.$router.push({path:"/question-list",query:{ask_question_id:ask_question_id}})
		},
	}
}
</script>

<style scoped lang="less">

.home-hot{
	.hot-tab{
		width: 63.2%;
		margin: 0.3rem auto 0.14rem auto;
		border-top: 1px solid #f2f2f2;
		
		display: flex;
		justify-content: space-between;
		.hot-tab-item{
			
			padding-top: 0.35rem;
			font-size: @tab-size;
			color:@sec-color;
			position: relative;
			&.active{
				color: @tab-color;
				&::after{
					position: absolute;
					left: 16px;
					bottom: -10px;
					content: "";
					display: block;
					background: @theme-color;
					width: 0.3rem;
					height: 0.05rem;
				}
			}
		}
	}
	.hot-center{
		width: @design-center;
		margin: 0.3rem auto 0 auto;
		// padding-bottom: 42.5%;
		box-shadow: 0 0 0.2rem -0.06rem @theme-color;
		border-radius: 0.2rem;
		// height: 0;
		overflow: hidden;
		.center-body{
			// height: 0;
			width: 88.5%;
			// padding-bottom: 80%;
			margin: 0.3rem auto 0 auto;
			.center-list{
				position: relative;
				font-size: @sec-title;
				color: @sec-color;
				line-height: @sec-line-height;
				margin-bottom: 0.4rem;
				padding-left: 0.4rem;
				.word-just-one-line;
				&::after{
					position: absolute;
					content: "";
					display: block;
					left: 1px;
					top: 4px;
					width: 0.1rem;
					height: 0.1rem;
					background: @theme-color;
				}
			}
		}
	}
}
</style>
