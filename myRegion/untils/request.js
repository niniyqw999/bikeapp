//设置基础地址
const baseURL = "http://100.87.56.58:3000/"
//登录
export function loginPhone(data){
	return uni.request({
		url:baseURL+"region/user",
		method:"POST",
		data
	})
}


//存储轨迹
export function saveTrack(data){
	return uni.request({
		url:baseURL+"region/savetracks",
		method:"POST",
		data
	})
}

//获取轨迹
export function getTrack(data){
	return uni.request({
		url:baseURL+"region/gettracks",
		method:"GET",
		data
	})
}
//删除轨迹
export function delTrack(id){
	return uni.request({
		url:baseURL+"region/deltracks/"+id,
		method:"DELETE",
	})
}