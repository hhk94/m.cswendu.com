<template>
  <div id="app">
	<keep-alive>
		<router-view/>
	</keep-alive>
		<div v-html="this.script" class="baidu"></div>
  </div>
</template>

<script>
//自定义公共js - own common css
import { console_log } from "@/utils/base.js"
import store from '@/store'
import { getHomeBanner} from '@/api/Home'
export default {
	name: 'app',
	mounted() {
		this.init()
	},
	data(){
		return{
			script:''
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
	}
}
</script>

<style lang="less">
// @deep: ~'>>>';	
#app{
	touch-action: none;
	/* background: ##f4f4f4; */
	padding-bottom: 1rem;
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
