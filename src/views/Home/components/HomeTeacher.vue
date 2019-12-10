<template>
	<div class="home-teacher">
		<div class="home-teacher-center">
			<h1 class="type-title" >
				文都名师
				<span class="more"
				@click="goToList()"><img src="@/assets/img/m-home-more.png" alt=""></span>
			</h1>
		</div>
		<div class="teacher-swiper">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide
				:data_index="item.teacher_id"
				v-for="item of hotTeacherList"
				:key="item.teacher_id">
					<div class="teacher-item" >
						<div class="item-img"><img :src="item.teacher_cover" alt=""></div>
						<div class="word">
							<h1>{{item.teacher_name}}
							<span>{{item.class_name}}</span>
							</h1>
							<h2>{{item.teacher_grading}}</h2>
						</div>
					</div>
				</swiper-slide>
				<!-- <swiper-slide>Slide 2</swiper-slide>	
				<swiper-slide>Slide 2</swiper-slide>	 -->
				<!-- <div class="swiper-pagination" slot="pagination"></div> -->
			</swiper>
		</div>
	</div>
</template>

<script>

export default {
	name:'HomeTeacher',
	data() {
		return {
			swiperOption: {
				slidesPerView: 'auto',
				spaceBetween: 30,
				loop:true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false
				},
			}
		}
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		}
	},
	props:{
		hotTeacherList:Array
	},
	mounted() {
		let _this = this;
		this.swiper.on('tap', function () {
			_this.goToDetail(this.clickedSlide.getAttribute('data_index'));//调用你自定义的方法
		})
	},
	methods:{
		goToList(){
			this.$router.push({path:'/teacher-List'}).catch(err => {err})
		},
		goToDetail(id){
			// console.log(id)
			this.$router.push({path:'/teacher-detail',query:{teacher_id:id}}).catch(err => {err})
		},
	}
}
</script>

<style scoped lang="less">
.home-teacher{
	.home-teacher-center{
		width: @design-center;
		margin: 0 auto;
		.type-title{
			.type-title;
		}
	}
	.teacher-swiper{
		.swiper-container{
			width: 100%;
		}
		.swiper-slide{
			width: 80%;
			
			// background: red;
			.teacher-item{
				margin: 0.26rem 0;
				box-shadow: 0 0 0.2rem 0.2rem #f7f7f7;
				width: 100%;
				overflow: hidden;
				.item-img{
					float: left;
					width: 40%;
					padding-bottom: 44.3%;
					height: 0;
					background: beige;
					img{
						width: 100%;
					}
				}
				.word{
					padding-left: 0.4rem;
					margin-top: 0.5rem;;
					width: calc(~"100% - 40%");
					float: right;
					h1{
						font-size: 0.22rem;
						color: #ffa43f;
						font-weight: bold;
						span{
							float: right;
							height: 0.3rem;
							line-height: 0.3rem;
							color: white;
							font-size: 0.16rem;
							padding: 0 0.06rem;
							background: @theme-color;
							font-weight: normal;
						}
					}
					h2{
						.word-four-line;
						text-align: left;
						padding-right: 0.3rem;
						margin-top: 0.15rem;
						font-size: 0.16rem;
						color: #666;
						line-height:@sec-line-height;
					}
				}
			}
		}
	}
	
}
</style>
