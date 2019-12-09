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
	{/*热门课程列表*/
		path: "/hot-course",
		name: "HotCourse",
		component: () => import( './views/HotCourse/HotCourse'),
		meta:{
		},  
	},
	{/*关于我们*/
		path: "/about-us",
		name: "AboutUs",
		component:() => import( './views/AboutUs/AboutUs.vue'),
		meta:{
		},  
	},
	{/*校区地址*/
		path: "/campus-list",
		name: "CampusList",
		component:() => import( './views/CampusList/CampusList.vue'),
		meta:{
		},  
	},
	{/*校区地址*/
		path: "/campus-detail",
		name: "CampusDetail",
		component:() => import( './views/CampusDetail/CampusDetail.vue'),
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
	{/*新闻详情*/
		path: "/news-detail",
		name: "NewsDetail",
		component:() => import( './views/NewsDetail/NewsDetail.vue'),
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
	{/*问答详情*/
		path: "/ask-detail",
		name: "AskDetail",
		component:() => import( './views/AskDetail/AskDetail.vue'),
		meta:{
		},  
	},
	{/*教师列表*/
		path: "/teacher-list",
		name: "TeacherList",
		component:() => import( './views/TeacherList/TeacherList.vue'),
		meta:{
		},  
	},
	{/*教师详情*/
		path: "/teacher-detail",
		name: "TeacherDetail",
		component:() => import( './views/TeacherDetail/TeacherDetail.vue'),
		meta:{
		},  
	},
	{/*教师详情*/
		path: "/spacial-1",
		name: "Spacial-1",
		component:() => import( './views/Spacial/Spacial-1.vue'),
		meta:{
		},  
	},
  ]
});

 