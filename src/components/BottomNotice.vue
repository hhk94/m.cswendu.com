<template>
	<div v-show="this.footer_bottom" class="bottom-notice">我是有底线的！~</div>

	
</template>

<script>

export default {
	name:'BottomNotice',
	data() {
		return {
			
		}
	},
	props:{
		footer_bottom:Boolean
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
.bottom-notice{
		text-align: center;
		color: @theme-color;
		font-size: 0.2rem;
	}
</style>
