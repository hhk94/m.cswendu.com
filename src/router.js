import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue'



Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
	{ 
	path: '/',
	redirect: '/shouye' ,
	},
	{/*测试*/
		path: "/test",
		name: "Test",
		component: () => import( './views/Test/Test'),
		meta:{
		},  
	},
    {/*首页*/
		path: "/shouye",
		name: "Home",
		component: Home,
		meta:{
			index:1
		},  
    },
	{/*热门课程列表*/
		path: "/hot-course",
		name: "HotCourse",
		component: () => import( './views/HotCourse/HotCourse'),
		meta:{
			index:2
		},  
	},
	{/*关于我们*/
		path: "/about-us",
		name: "AboutUs",
		component:() => import( './views/AboutUs/AboutUs.vue'),
		meta:{
			index:2
		},  
	},
	{/*校区地址*/
		path: "/campus-list",
		name: "CampusList",
		component:() => import( './views/CampusList/CampusList.vue'),
		meta:{
			index:2
		},  
	},
	{/*校区地址*/
		path: "/campus-detail",
		name: "CampusDetail",
		component:() => import( './views/CampusDetail/CampusDetail.vue'),
		meta:{
			index:3
		},  
	},
	{/*课程列表*/
		path: "/course-list",
		name: "CourseList",
		component:() => import( './views/CourseList/CourseList.vue'),
		meta:{
			index:2
		},  
	},
	{/*新闻列表*/
		path: "/news-list",
		name: "NewsList",
		component:() => import( './views/NewsList/NewsList.vue'),
		meta:{
		},  
		index:2
	},
	{/*新闻详情*/
		path: "/news-detail",
		name: "NewsDetail",
		component:() => import( './views/NewsDetail/NewsDetail.vue'),
		meta:{
			index:3
		},  
	},
	{/*评论列表*/
		path: "/comment-list",
		name: "CommentList",
		component:() => import( './views/CommentList/CommentList.vue'),
		meta:{
			index:2
		},  
	},
	{/*问答列表*/
		path: "/ask-list",
		name: "AskList",
		component:() => import( './views/AskList/AskList.vue'),
		meta:{
			index:2
		},  
	},
	{/*问答详情*/
		path: "/ask-detail",
		name: "AskDetail",
		component:() => import( './views/AskDetail/AskDetail.vue'),
		meta:{
			index:3
		},  
	},
	{/*教师列表*/
		path: "/teacher-list",
		name: "TeacherList",
		component:() => import( './views/TeacherList/TeacherList.vue'),
		meta:{
			index:2
		},  
	},
	{/*教师详情*/
		path: "/teacher-detail",
		name: "TeacherDetail",
		component:() => import( './views/TeacherDetail/TeacherDetail.vue'),
		meta:{
			index:3
		},  
	},
	
	{/*下载列表*/
		path: "/download-list",
		name: "DownloadList",
		component:() => import( './views/DownloadList/DownloadList.vue'),
		meta:{
			index:2
		},  
	},
	{/*下载列表*/
		path: "/download-detail",
		name: "DownloadDetail",
		component:() => import( './views/DownloadDetail/DownloadDetail.vue'),
		meta:{
			index:3
		},  
	},
	{
	/*专题页*/
		path: "/spacial",
		name: "Spacial",
		component:() => import( './views/Spacial/Spacial.vue'),
		meta:{
			index:3
		},
		children:[
			{
				// 当 /spacial/spacial-1 匹配成功，
				// spacial-1会被渲染在 spacial的 <router-view> 中
				path: "spacial-1",
				name: "Spacial-1",
				component:() => import( './views/Spacial/Spacial-1.vue'),
			},
			{
				path: "spacial-2",
				name: "Spacial-2",
				component:() => import( './views/Spacial/Spacial-2.vue'),
			},
			{
				path: "spacial-3",
				name: "Spacial-3",
				component:() => import( './views/Spacial/Spacial-3.vue'),
			},
		]
	},
  ]
});

 