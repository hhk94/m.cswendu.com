<template>

  <div id="app">
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
import { console_log } from "@/utils/base.js"
import HomeFooter from '@/components/Footer'
import store from '@/store'
import { getHomeBanner} from '@/api/Home'
export default {
	name: 'app',
	components:{
		HomeFooter
	},
	mounted() {
		this.init()
	},
	data(){
		return{
			script:'',
			transitionName:''
		}
	},
	methods:{
		async init(){
			await this.$store.dispatch('Home/setCommonToken');
			// token = token.content.user_token
			this.joinScript()
			
		},
		joinScript(){
			let data ={
			key:'baidu_tongji',
			app_class:'mobile',
			user_token:store.getters.common_token,
			}
			new Promise((resolve, reject) => {
			getHomeBanner(data).then(response => {
				resolve()
				console_log(response)
				if(response.state==0){
					this.$message.error('joinScript接口错误');
				}else if(response.state==1){
					//empty
					// let script = response.value
					this.script= response.value
					
					
				}
				}).catch(error => {
					reject(error)
			})
			})
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
		}
	}
}
</script>

<style lang="less">
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
