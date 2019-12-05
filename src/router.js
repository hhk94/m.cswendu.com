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
    {/*首页*/
		path: "/shouye",
		name: "Home",
		component: Home,
		meta:{
		},  
    },
	{/*课程列表*/
		path: "/course-list",
		name: "CourseList",
		component:() => import( './views/CourseList/CourseList.vue'),
		meta:{
		},  
	},
	{/*新闻列表*/
		path: "/news-list",
		name: "NewsList",
		component:() => import( './views/NewsList/NewsList.vue'),
		meta:{
		},  
	},
	{/*评论列表*/
		path: "/comment-list",
		name: "CommentList",
		component:() => import( './views/CommentList/CommentList.vue'),
		meta:{
		},  
	},
	{/*问答列表*/
		path: "/ask-list",
		name: "AskList",
		component:() => import( './views/AskList/AskList.vue'),
		meta:{
		},  
	},
	{/*热门课程列表*/
		path: "/hot-course",
		name: "HotCourse",
		component: () => import( './views/HotCourse/HotCourse'),
		meta:{
		},  
	} 
  ]
});

 