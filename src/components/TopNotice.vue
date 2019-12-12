<template>
	<div class="notice-body">
		<div class="top-notice" v-show="this.alreadyTop">我已经到头啦！~</div>
	</div>
	

	
</template>

<script>

export default {
	name:'BottomNotice',
	data() {
		return {
			
		}
	},
	props:{
		alreadyTop:Boolean
	},
	mounted(){
		
	},
	destroyed() {
		
	},
	methods:{
		
	}
}
</script>

<style scoped lang="less">
.notice-body{
	position: relative;
	top: 0;
	left: 0;
}
.top-notice{
	position: absolute;
	left: 0;
	top: -1rem;
	width: 100%;
	text-align: center;
	color: @theme-color;
	font-size: 0.2rem;
	padding: 0.1rem 0;
}
</style>
