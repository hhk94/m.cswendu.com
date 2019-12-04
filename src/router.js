import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue'
import Course from './views/Course/Course.vue'


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
		path: "/course",
		name: "Course",
		component: Course,
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

 