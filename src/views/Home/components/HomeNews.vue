<template>
	<div class="home-news">
		<div class="home-news-center">
			<h1 class="type-title">
				考研资讯
				<span class="more"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
			<div class="list-center">
				<div class="list-item"
				v-for="item of allNewsList"
				:key="item.news_info_id">
					<div class="item-pic"><img :src="item.cover" alt=""></div>
					<div class="word">
						<h1>{{item.title}}</h1>
						<div>
							<span>{{item.author}}</span>
							<span>331</span>
							<span>阅读</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<span class="last-notice" v-show="this.footer_bottom">我是有底线的！~</span>
	</div>
	<!-- <div class="home-news">
		<div class="home-news-center">
			<h1 class="type-title">
				考研资讯
				<span class="more"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
		</div>
		<yd-infinitescroll :callback="getNews" ref="infinitescrollDemo" :distance="px" > 
			
			<div slot="list" class="list-center" >
				<div v-for="(item, key) of newsList" 
				:key="key" 
				class="list-item">
					<div class="item-pic"><img :src="item.cover" alt=""></div>
					<div class="word">
						<h1>{{item.title}}</h1>
						<div>
							<span>{{item.author}}</span>
						
						</div>
					</div>
				</div>
			</div>
			
			<span slot="doneTip">我是有底线的！~</span>
			
			
			<span slot="loadingTip" class="load">加载中</span>
		</yd-infinitescroll>
		<span v-show="this.footer_bottom">我是有底线的！~</span>
	</div> -->
	
	

</template>

<script>
// import { console_log } from "@/utils/base.js"
// import store from '@/store'
// import { getNewsList } from '@/api/Base'
export default {
	name:'HomeNews',
	data() {
		return {
			page:1,
			limit:8,
			newsList:[],
			px:5,		
		}
	},
	props:{
		// commentList:Array,
		tokenOver:Boolean,
		footer_bottom:Boolean,
		allNewsList:Array
	},
	mounted(){
		
	},
	watch:{
		tokenOver(){
			// console.log('a')
			// this.getNews()
		}
	},
	methods:{
		//获取新闻
		// getNews(){
		// 	let data ={
		// 		user_token:store.getters.common_token,
		// 		app_class:'mobile',
		// 		page:this.page,
		// 		limit:this.limit
		// 	}
		// 	new Promise((resolve, reject) => {
		// 		getNewsList(data).then(response => {
		// 			resolve(response)
		// 			console_log(response)
		// 			if(response.state==0){
		// 				this.$message.error('getNews接口错误');
		// 			}else if(response.state==1){
		// 				const _list = response.content
		// 				this.newsList = [...this.newsList, ..._list];
		// 				console.log(this.newsList)
		// 				if (_list.length < this.limit || this.page == 2) {
		// 					/* 所有数据加载完毕 */
		// 					this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
		// 					return;
		// 				}
		// 				/* 单次请求数据完毕 */
		// 				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
		// 				this.page++;	
		// 			}
		// 			}).catch(error => {
		// 				reject(error)
		// 		})
		// 	})
		// },
	}
}
</script>

<style scoped lang="less">
.home-news{
	margin-top: 0.45rem;
	padding-bottom: 0.5rem;;
	.last-notice{
		text-align: center;
		color: @theme-color;
		font-size: 0.2rem;
		display: block;
		width: 100%;
	}
	.load{
		text-align: center;
		font-size: 0.2rem;
		color: @theme-color;
	}
	.home-news-center{
		width: @design-center;
		margin: 0 auto;
		padding-bottom: 0.2rem;
		.type-title{
			.type-title;
		}
	}
	.list-center{
		.list-item{
			width: 100%;
			overflow: hidden;
			border-bottom: 1px solid #f9f9f9;
			padding: 0.3rem 0.15rem;
			.item-pic{
				float: left;
				width: 29%;
				height: 0;
				padding-bottom: 15.2%;
				// background: red;
				img{
					width: 100%;
				}
			}
			.word{
				width: calc(~"100% - 29%");
				float: left;
				padding: 0 .13rem 15.2% 0.13rem;
				height:0;
				position: relative;
				h1{
					font-size: @tab-size;
					color: @tab-color;
					line-height: @sec-line-height;
					.word-two-line;
				}
				div{
					position: absolute;
					left: 0.13rem;
					bottom:0;
					span{
						font-size: 0.16rem;
						color: @sec-color;
						margin-right: 0.2rem;
					}
				}
			}
		}
		
	}
}
</style>
