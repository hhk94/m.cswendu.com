<template>
	<div class="spacial-body">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name:"Spacial",
	components:{
	
	},
	data (){
		return {
			//导航监听显示
			showAbs:true,
			opacityStyle:{
				opacity:1,
				// background:'#7abff7'
			},
			background:{
				background:''
			},
			headerName:'BackHeader',
			//下拉显示文字
			alreadyTop:true,
			footer_bottom:false,
			name:'',
			phone:'',
			qq:'',
			timer: '',
		}
	},
	activated() {
	
		
	},
	methods:{
		
		
		
	}
}
</script>

<style scoped lang="less">

</style>
