<template>
	<div class="home-news">
		<div class="home-news-center">
			<h1 class="type-title">
				考研资讯
				<span class="more"
				@click="goToList()"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
			<div class="list-center">
				<div class="list-item"
				@click="goToDetail(item.news_info_id,item.news_class_id_array)"
				v-for="item of allNewsList"
				:key="item.news_info_id">
					<div class="item-pic"><img  v-lazy="item.http_img" alt=""></div>
					<div class="word">
						<h1>{{item.title}}</h1>
						<div>
							<span>{{item.author}}</span>
							<!-- <span>331</span> -->
							<span>阅读</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<span class="last-notice" v-show="this.footer_bottom">我是有底线的！~</span>
	</div>

	
	

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
		goToList(){
			this.$router.push({path:'/news-List'}).catch(err => {err})
		},
		goToDetail(id,class_id_array){
			
			this.$router.push({path:'/news-detail',query:{news_info_id:id,class_id_array:class_id_array}}).catch(err => {err})
		},
		
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
					.word-just-one-line;
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
