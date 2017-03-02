define(['jquery','common','nprogress','util','template'],function($,undefined,nprogress,util,template){
	nprogress.done();
	console.log(util);

	/*编辑讲师，根据是否有tc_id来判断是编辑还是添加讲师
	* 编辑讲师就需要获取到当前讲师的信息在此基础上编辑
	* 先获取讲师信息，展示到表单中
	* */

	var tcId=util.getQueryString('tc_id');
	//这是编辑讲师相关的操作
	if(tcId){
		$.get('/v6/teacher/edit',{tc_id:tcId},function(data){
			if(data.code==200){
				var html=template('teacher-form-tpl',data.result);
				$('.teacher-add').html(html);
			}
		});
	}
	//这是添加讲师相关的操作
	else{
		var html=template('teacher-form-tpl',{});
		$('.teacher-add').html(html);
		/*//添加讲师
		$('#teacher-add-form').on('submit',function(){
			$.ajax({
				url:'/v6/teacher/add',
				type:'post',
				data:$(this).serialize(),
				success:function(data){
					console.log(data)
					if(data.code==200){
						location.href='/html/teacher/list.html';
					}
				}
			})
			return false;
		})*/
	}
	/*
	* 监听表单提交时间  装换为ajax请求
	*如果是编辑 就是/v6/teacher/update  需要一个tc_id参数
	*如果是添加 就是/v6/teacher/add
	* */
	$('.teacher-add').on('submit','#teacher-add-form',function(){
		$.ajax({
			url:'/v6/teacher/'+(tcId?'update':'add'),
			type:'post',
			data:$(this).serialize()+(tcId?'&tc_id='+tcId:''),
			success:function(data){
				if(data.code==200){
					location.href='/html/teacher/list.html';
				}
			}
		})
		return false;
	})
})