<template>
  <div id="app">
	<keep-alive>
		<router-view/>
	</keep-alive>
    
  </div>
</template>

<script>


export default {
  name: 'app',
  
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
