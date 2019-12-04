<template>
	<div class="home-comment">
		<div class="home-comment-center">
			<h1 class="type-title">
				口碑评价
				<span class="more"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
			<div class="list-center">
				<div class="list-item"
				v-for="item of commentList"
				:key="item.course_comment_id">
					<p><span>{{item.user_name}}:</span>&nbsp;&nbsp;{{item.comment}}</p>
					<h1 class="sec-title">报名课程：{{item.course_name}}</h1>
					<div class="span-body">
						<span class="sec-title">校    区：{{item.campus_name}}</span>
						<span class="sec-title">{{item.create_time}}</span>
					</div>
				</div>
			</div>
		
		</div>
		
	</div>
</template>

<script>
// import { console_log } from "@/utils/base.js"
export default {
	name:'HomeComment',
	data() {
		return {
			
		}
	},
	props:{
		commentList:Array,
		// courseList:Array
	},
	watch:{
		
	},
	methods:{
		
	}
}
</script>

<style scoped lang="less">
.home-comment{
	margin-top: 0.45rem;
	.home-comment-center{
		width: @design-center;
		margin: 0 auto;
		padding-bottom: 0.2rem;
		.type-title{
			.type-title;
		}
	}
	.list-center{
		.list-item{
			padding-top: 0.2rem;
			border-bottom: 1px solid #f2f2f2;
			p{
				font-size: 0.2rem;
				color: @tab-color;
				span{
					color: @theme-color;
				}
			}
			.sec-title{
				font-size: 0.16rem;
				color: @sec-color;
			}
			h1{
				margin-top: 0.4rem;;
			}
			.span-body{
				overflow: hidden;
				margin-top: 0.05rem;
				padding-bottom: 0.2rem;
				span{
					float: left;	
				}
				span+span{
					float: right;
				}
			}
		}
		
	}
}
</style>
