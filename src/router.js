import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue'
import Course from './views/Course/Course.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
		path: "/",
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
   } 
  ]
});

 