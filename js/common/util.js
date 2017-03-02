define([], {
	getQueryString:function(key){
		// 去掉字符串首字母?号        ./03接收参数的页面.html?name=zr&age=28
		var search = location.search.slice(1);
		//console.log(search); //name=zr&age=28
		// 使用&符号得到每一个key=val
		var searchArr = search.split('&');
		//console.log(searchArr); //["name=zr", "age=28"]
		var tempArr = null;
		var searchObj = {};

		// 遍历数组中的每一个key=val字符串，使用=号劈开，
		// 然后以key为名，val为值添加到searchObj对象中。
		for(var i = 0, len = searchArr.length; i < len; i++) {
			tempArr = searchArr[i].split('=');
			searchObj[tempArr[0]] = tempArr[1];
		}

		// 有参数返回指定值，没有参数返回全部值
		return arguments.length ? searchObj[key] : searchObj;
		//return searchObj;
	}
})