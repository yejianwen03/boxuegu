define(['jquery','common','nprogress','template'],function($,undefined,nprogress,template){
	nprogress.done();
	
	//讲师列表数据缓存
	var treacherListCache;
	try{
		treacherListCache=JSON.parse(localStorage.getItem('treacherListCache'));
	}
	catch(e){}

	if(treacherListCache){
		var html=template('teacher-list-tpl',{list:treacherListCache});
		$('#teacher-list-tbody').html(html);
	}else{
		//渲染讲师列表
		$.get('/v6/teacher',function(data){
			if(data.code==200){
				localStorage.setItem('treaherListCache',JSON.stringify(data.result));
				//console.log(localStorage.getItem('treaherListCache'));
				var html=template('teacher-list-tpl',{list:data.result});
				$('#teacher-list-tbody').html(html);
			}
		});
	}
	
	
	//教师面板发送请求
	$('#teacher-list-tbody').on('click', '.teacher-view', function() {
		$.get('/v6/teacher/view',{
			tc_id: $(this).parent().attr('data-id')
		},function(data) {
			if(data.code == 200) {
				var html = template('teacher-view-tpl', data.result);
				$('#teacherModal').html(html);
			}
		});
	});
	
	//注销讲师功能
	$('#teacher-list-tbody').on('click', '.teacher-status', function() {
		$self=$(this);
		$.ajax({
			type:"post",
			url:"/v6/teacher/handle",
			data:{
				tc_id: $(this).parent().attr('data-id'),
				tc_status: $(this).parent().attr('data-status'),
			},
			success: function(data){
				if(data.code==200){
					$self.html(data.result.tc_status==0?'开启':'注销');
					$self.parent().attr('data-status',data.result.tc_status);
				}
			}
		});
	});
})