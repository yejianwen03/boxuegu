define(['jquery','jqueryCookie'], function($,undefined) {
	
	//ajax请求loading
	$(document).ajaxStart(function(){
		$('.overlay').show();
	}).ajaxStop(function(){
		$('.overlay').hide();
	})
	// 左侧导航下拉列表
	$('.navs a').on('click', function() {
		$(this).next().slideToggle();
	});
	
	//退出功能
	$("#logout").on("click",function(){
		$.post("/v6/logout",function(data){
			if(data.code==200){
				location.href='/html/home/login.html';
			}
		})
	})
	
	//获取本地cookie用户信息  然后展示到左侧导航
	var userInfo=null;
	try{
		userInfo=JSON.parse($.cookie('userInfo'))
	}catch(e){
		userInfo={};
	}
	$('.aside .profile h4').html(userInfo.tc_name?userInfo.tc_name:'您的名字');
	$('.aside .profile img').attr('src', userInfo.tc_avatar?userInfo.tc_avatar:'/img/default.png');
	
	//根据左侧选定的固定其选择
	var pathname=window.location.pathname;
	$(".navs a").removeClass("active").filter('[href="'+pathname+'"]').addClass('active').parents('ul').show();
});
