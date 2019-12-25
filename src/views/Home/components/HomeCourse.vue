<template>
	<div class="home-course">
		<div class="home-course-center">
			<h1 class="type-title">
				考研课程
				<span class="more"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
			<div class="tabs">
				<div 
				:class="{'active':isActive==item.course_class_name,'tabs-item':true}"
				v-for="(item,index) of tabs"
				@click="tabChange(item.course_class_name,item.course_class_id)"
				:key="index">{{item.course_class_name}}</div>
				
			</div>
			<div class="course-body">
				<div
				@click="goToDetail(item.course_class_name)"
				class="course-item"
				v-for="(item) of courseList"
				:key="item.course_id">
					<div class="course-img">
						<img :src="item.http_img" alt="">
					</div>
					<div class="word">
						<h1>{{item.course_name}}</h1>
						<h2>{{item.course_slogan}}</h2>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import { console_log } from "@/utils/base.js"
export default {
	name:'HomeCourse',
	data() {
		return {
			tabs:[],
			isActive:''
		}
	},
	props:{
		courseClassList:Array,
		courseList:Array
	},
	watch:{
		courseClassList(){
			this.tabs = this.courseClassList.slice(0,3)
			console_log(this.tabs)
			this.isActive =this.tabs[0].course_class_name
		}
	},
	methods:{
		goToDetail(course_class_name){
			console.log(course_class_name)
			if(course_class_name=='鹰飞集训营'){
				this.$router.push({path:'/spacial/spacial-1'}).catch(err => {err})
			}else if(course_class_name=='高端彩虹卡'){
				this.$router.push({path:'/spacial/spacial-2'}).catch(err => {err})
			}else{
				this.$router.push({path:'/spacial/spacial-3'}).catch(err => {err})
			}
		},
		tabChange(item,id){
			this.isActive = item
			console.log(id)
			this.$emit('courseClassId', id);
		},
	}
}
</script>

<style scoped lang="less">
.home-course{
	margin-top: 0.45rem;
	.home-course-center{
		width: @design-center;
		margin: 0 auto;
		padding-bottom: 0.2rem;
		.type-title{
			.type-title;
		}
	}
	.tabs{
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		width: 100%;
		.tabs-item{
			margin: 0.15rem auto;
			padding: 0 0.2rem;
			height: 0.3rem;
			line-height: 0.3rem;
			border-radius: 0.3rem;
			color: @sec-color;
			font-size: @tab-size;
			&.active{
				background:@theme-color;
				color: white;
			}
		}
	}
	.course-body{
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap;
		.course-item{
			border-radius: 0.2rem;
			overflow: hidden;
			margin: 0.2rem 0;
			width: 48.6%;
			box-shadow: 0 0 0.2rem 0.2rem #f7f7f7;
			.course-img{
				width: 100%;
				padding-bottom: 57.2%;
				height: 0;
				// background: red;
				overflow: hidden;
				img{
					width: 100%;
					
				}
			}
			.word{
				width: 94%;
				margin: 0 auto;
				overflow: hidden;
				h1{
					.word-just-one-line;
					margin-top: 0.1rem;
					font-size: @tab-size;
					color: @tab-color;
					line-height: @sec-line-height;
				}
				h2{
					.word-just-one-line;
					font-size: @sec-title;
					color: @sec-color;
					margin: 0.1rem 0 0.15rem 0;
					line-height: 0.3rem;
				}
			}
		}
	}
}
</style>
