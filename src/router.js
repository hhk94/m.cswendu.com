import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue'



Vue.use(Router);

export default new Router({
  routes: [
	{ 
	path: '/',
	redirect: '/shouye' ,
	},
    {
		path: "/shouye",
		name: "Home",
		component: Home,
		meta:{
		},  
    },
	{
		path: "/course-list",
		name: "CourseList",
		component:() => import( './views/CourseList/CourseList.vue'),
		meta:{
		},  
	},
	{
		path: "/hot-course",
		name: "HotCourse",
		component: () => import( './views/HotCourse/HotCourse'),
		meta:{
		},  
	} 
  ]
});

 