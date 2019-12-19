<template>

  <div id="app">
	<transition
	enter-active-class="animated bounceInDown"
	leave-active-class="animated bounceOutLeft"
	:durantion="400"
	>
		<div class="top-btn" @click="toTop()" v-show="this.show_hidden">Top</div>
		
	</transition>
	<transition :name="transitionName" >	
	<keep-alive>
		
			<router-view/>
		
		
	</keep-alive>
	</transition>
		<home-footer></home-footer>	
		
		<div v-html="this.script" class="baidu"></div>
  </div>

</template>

<script>
//自定义公共js - own common css
// import { console_log } from "@/utils/base.js"
import HomeFooter from '@/components/Footer'
import Utils from '@/utils/Utils.js'
// import { getHomeBanner} from '@/api/Home'
import { mapState} from 'vuex'
export default {
	name: 'app',
	components:{
		HomeFooter
	},
	mounted() {
		// this.init()
		console.log(this.show_hidden)
	},
	data(){
		return{
			script:'',
			transitionName:''
		}
	},
	computed:{
		...mapState({
			//"keyword":"count"    //count可以显示
			"show_hidden": state => state.Home.show_hidden
		})
	},
	methods:{
		toTop() {
			Utils.$emit('toTop');
		},
		async joinScript(){
			const response = await this.$store.dispatch('Home/joinScript');
			this.script = response.value
		},
	},
	watch: {
		// 使用watch 监听$router的变化
		$route (to, from) {
		// 如果to索引大于from索引,判断为前进状态,反之则为后退状态 
			if (to.meta.index > from.meta.index){
			// 设置动画名称
				this.transitionName = 'slide-left';
			} else{
				this.transitionName = 'slide-right';
			}
			
			// const agent = navigator.userAgent
			
			// // 判断微信浏览器
			// // const isWeixin =  !!/MicroMessenger/i.test(agent);
			// const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
			// if (isiOS){
			// 	// 不会刷新浏览器，只是让微信浏览器同步当前url
			// 	// eslint-disable-next-line
			// 	// window.location.assign( '/'+to.fullPath)
			// 	window.location.href = window.location.href
			// 	console.log('a')
			// }
			
			
		}
	}
}
</script>

<style lang="less">
.top-btn{
	position: fixed;
	bottom: 1rem;
	right: 0.1rem;
	background: rgba(0,0,0,0.3);
	height: 1rem;
	width: 0.8rem;
	z-index: 9999;
	color: 0.3rem;
	text-align: center;
	line-height: 1rem;
	color: white;
	border-radius: 0.2rem;
}
.router-view{
position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 500ms;
	position: absolute;
	width: 100%;//这里的定位使用relative可以解决切换时页面残影
}
.slide-right-enter {
	// opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
	// opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
	// opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
	// opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
// @deep: ~'>>>';	
#app{
	touch-action: none;
	/* background: ##f4f4f4; */
	// padding-bottom: 1rem;
	height: 100%;
	// @{deep} .swiper-pagination-bullet{
	// 	border-radius: 0.08rem;
	// 	height: 0.08rem;
	// 	width: 0.12rem;
	// }
	// @{deep} .swiper-pagination-bullet-active{
	// 	width: 0.33rem;
	// 	background:@theme-color;
	// }
}
#app/deep/.swiper-pagination-bullet{
		border-radius: 0.08rem;
		height: 0.08rem;
		width: 0.12rem;
		
}
#app/deep/.swiper-pagination-bullet-active{
	width: 0.33rem;
	background:@theme-color;
}

</style>
