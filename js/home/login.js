/**
 * Created by Administrator on 2017/2/25.
 */
define(['jquery','jqueryCookie','nprogress'], function($,undefined,nprogress) {
	
	/**
	 * 展示用户的历史登陆头像：
	 * 1、获取userInfo这个cookie值
	 * 2、把cookie字符串转化为对象
	 * 3、设置登陆页的img-src为对象中的tc_avatar属性值，如果没有给一个默认头像的地址
	 */
	var userInfo=null;
	try{
		userInfo=JSON.parse($.cookie('userInfo'));
	}catch(e){
		userInfo={};
	}
	$('.login .avatar img').attr('src',userInfo.tc_avatar?userInfo.tc_avatar:'/img/default.png');
	
    $("#form-login").on("submit",function(){
    	$.ajax({
    		type:"post",
    		url:"/v6/login",
    		data:$(this).serialize(),
    		success:function(data){
    			console.log(data);
    			if(data.code===200){
    				//如果登录成功，使用cookie的方式保存用户信息
    				//注意:cookie值必须为字符串，我们得到的是js对象，需要用JSON.stringify进行转换
    				//JSON.stringify把对象转换字符串  后续再用JSON.parse转换回来
    				$.cookie('userInfo',JSON.stringify(data.result),{path:'/'});
    				location.href='/'
    			}
    		}
    	});
    	return false;
    })
    nprogress.done();
});