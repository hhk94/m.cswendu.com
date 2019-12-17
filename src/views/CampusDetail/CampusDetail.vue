<template>
	<div class="map-body">
		<component
		:is="headerName" 
		v-show="showAbs"
		:style="opacityStyle"></component>
		<div class="map" ref="wrapper">
			<div>
				<div >
					<top-notice :alreadyTop="alreadyTop"></top-notice>
					<div class="top">
						<div class="word">
							<h1>{{this.name}}</h1>
							<h2>{{this.address}}</h2>
						</div>
						
					</div>
					<div class="map-center">
						
							<!-- <baidu-map class="map-detail" center="长沙" :zoom="my_zoom"
							@ready="handler" ak="0DLYDIjeyUdprzjIGOwnAm2xmKjZdu7z">
							
								<bm-view class="map"></bm-view>
								<bm-local-search :keyword="address" :auto-viewport="true" :location="location"></bm-local-search>
							</baidu-map> -->
						<baidu-map :zoom="my_zoom" @ready="init()">
						<bm-view class="map-detail"></bm-view>
						<bm-local-search 
						:keyword="address" 
						:auto-viewport="true" 
						:location="location" 
						
						:selectFirstResult="true"
						></bm-local-search>
						<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
						</baidu-map>
						<div class="info">
							<h1>{{this.address}}</h1>
							<h2><i class="fa fa-phone-square"></i>湖南二十四小时在线电话：153-6782-6050</h2>
							<div class="btn-tel" @click="tel('tel://15367826050')"><i class="fa fa-phone" ></i>电话咨询</div>
						</div>
					</div>
					
					
				</div>
				
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
import Utils from '@/utils/Utils.js'//和app.vue通信 点击回到顶部
import BackHeader from '@/components/BackHeader'
import TopNotice from '@/components/TopNotice'
//自定义公共js - own common css
import { console_log} from "@/utils/base.js"
import store from '@/store'
import BScroll from 'better-scroll'
import { mapActions} from 'vuex'
export default {
	name:"HomeCourse",
	components:{
		BackHeader,
		TopNotice,
	},
	data (){
		return {
			my_zoom:15,
			name:'',
			address:'',
			location:'长沙',
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'#7abff7'
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
		
		}
	},
	created() {
		this.address = this.$route.query.address
		this.name = this.$route.query.name
	},
	activated() {
		this.init()
		console_log(this.address)
	},
	mounted() {
		console_log('mounted')
		var that = this;
		Utils.$on('toTop', function () {
		that.scrollToTop();
		})
	},
	methods:{
		...mapActions("Home",['toTopShowOrHidden']),
		scrollToTop(){
			this.scroll.scrollTo(0,0,1000) 
		},
		tel(href){
			window.location.href=href
		},
		Scroll(){
			
			this.scroll = new BScroll(this.$refs.wrapper,{
				probeType:2,
				pullUpLoad: {
					threshold: -10
				},
				scrollX: false,
				scrollY: true,
				useTransition:false,
				click: true
			})
			
			this.scroll.on('scroll',(pos)=>{
				const top = -pos.y
				top>0?(this.alreadyTop = false):(this.alreadyTop = true)
				// console_log(this.alreadyTop)
				if(top>60){
					this.toTopShowOrHidden(true)
				}else{
					this.toTopShowOrHidden(false)
				}
			})
			this.scroll.on("pullingUp",()=>{
				console_log('pullingUp')
				
				if(!this.footer_bottom){
					// this.getTeacherList()
					this.scroll.finishPullUp();
					
				}else{
					console_log('end')
					this.footer_bottom = true
				}
				
			})
		},
		async init(){
			if(!store.getters.common_token){
				await this.$store.dispatch('Home/setCommonToken');
			}
			
			this.$nextTick(() => {
				
				this.Scroll()
			});
			
		},
		
		
	}
}
</script>

<style scoped lang="less">
.map-body{
	height: 100%;
}
.map{
	height: 100%;
	overflow: hidden;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	.top{
		padding-bottom: 43%;
		background: url('~@/assets/img/m-map-bg.png') no-repeat center center ;
		overflow: hidden;
		height: 0;
		.word{
			width: @design-center;
			margin: 0 auto;
			margin-top: 100px;
			h1{
				font-size: 0.36rem;
				color: white;
				font-weight: bold;
			}
			h2{
				margin-top: 0.1rem;
				font-size: 0.22rem;
				color: white;
			}
		}
	}
	.map-center{
		width: @design-center;
		margin: 0 auto;
		padding-bottom:1rem;
		.map-detail{
			width: 100%;
			height: 5.8rem;
			margin-top: 4.1%;
			// background: red;
			border-radius: 0.2rem;
			overflow: hidden;
		}
		.info{
			margin-top: 0.3rem;
			padding-bottom: 1rem;
			.fa{
				margin-right: 0.1rem;
			}
			h1{
				color: #525252;
				font-size: 0.22rem;
				font-weight: bold;
			}
			h2{
				margin-top: 0.2rem;
				font-size: 0.22rem;
				color: #ffa43f;
			}
			.btn-tel{
				font-size: 0.24rem;
				color: white;
				height: 0.6rem;
				width: 4rem;
				background: @theme-color;
				text-align: center;
				line-height: 0.6rem;
				margin: 0.2rem auto;
				border-radius: 0.6rem;
			}
		}
	}
	
}
</style>
