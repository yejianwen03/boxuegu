/**
 * Created by Administrator on 2017/2/25.
 */
requirejs.config({
    baseUrl:'/',
    paths:{
        jquery:'lib/jquery/jquery.min',
        jqueryCookie:'lib/jquery-cookie/jquery.cookie',
        bootstrap:'lib/bootstrap/js/bootstrap.min',
        nprogress:'lib/nprogress/nprogress',
        template:'lib/artTemplate-3.0.1/template',

        common:'js/common/common',
        util:'js/common/util',

        courseAdd:'js/course/add',
        courseAdd_step1:'js/course/add_step1',
        courseAdd_step2:'js/course/add_step2',
        courseAdd_step3:'js/course/add_step3',
        courseCategory:'js/course/category',
        courseCategory_add:'js/course/category_add',
        courseList:'js/course/list',
        courseTopic:'js/course/topic',

        homeLogin:'js/home/login',
        homeRepass:'js/home/repass',
        homeSetting:'js/home/setting',

        teacherAdd:'js/teacher/add',
        teacherList:'js/teacher/list',

        userList:'js/user/list',
        userProfile:'js/user/profile',
        
        index:'js/index'
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        /*jqueryCookie:{
        	exports:'$.cookie'
        }*/
    }
});
require(['nprogress'],function(nprogress){
	nprogress.start();
});
require(['jquery','bootstrap','common']);

(function(window){
	//先获取路径
	var pathname=window.location.pathname;
	/*判断登录状态
	 * 登录页面：如果有SESSID 不用管  ，如果没有就跳到登录界面
	 *非登录页面：如果有SESSID　不用管，　如果没有就跳到登录页面
	 * */
	
	//登录状态前端效应
	require(['jquery','jqueryCookie'],function($,undefined){
		var sessID=$.cookie('PHPSESSID');
		if(pathname==='/html/home/login.html'&&sessID){
			location.href='/';
		}else if(pathname!=='/html/home/login.html'&&!sessID){
			location.href='/html/home/login.html';
		}
		 //如果没有发生页面跳转 就加载对于的js模块
    switch (pathname){
    	case '/':
            require(['index']);
            break;
        case '/html/course/add.html':
            require(['courseAdd']);
            break;
        case '/html/course/add_step1.html':
            require(['courseAdd_step1']);
            break;
        case '/html/course/add_step2.html':
            require(['courseAdd_step2']);
            break;
        case '/html/course/add_step3.html':
            require(['courseAdd_step3']);
            break;
        case '/html/course/category.html':
            require(['courseCategory']);
            break;
        case '/html/course/category_add.html':
            require(['courseCategory_add']);
            break;
        case '/html/course/list.html':
            require(['courseList']);
            break;
        case '/html/course/topic.html':
            require(['courseTopic']);
            break;

        /*=================home=======================*/
        case '/html/home/login.html':
            require(['homeLogin']);
            break;
        case '/html/home/repass.html':
            require(['homeRepass']);
            break;
        case '/html/home/setting.html':
            require(['homeSetting']);
            break;

        /*===============teacher=========================*/
        case '/html/teacher/add.html':
            require(['teacherAdd']);
            break;
        case '/html/teacher/list.html':
            require(['teacherList']);
            break;

        /*==================user==========================*/
        case '/html/user/list.html':
            require(['userList']);
            break;
        case '/html/user/profile.html':
            require(['userProfile']);
            break;
    }
	})
})(window)
