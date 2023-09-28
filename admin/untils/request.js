//设置基础地址
const baseURL = "http://100.87.56.58:3000/"

//获取用户信息
export function getUser(){
	return uni.request({
		url:baseURL+"region/getusers",
		method:"GET",
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
//删除用户
export function delUser(phone){
	return uni.request({
		url:baseURL+"region/deluser/"+phone,
		method:"DELETE",
	})
}

// 计算两个经纬度之间的距离（单位：米）
export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // 地球半径，单位为米

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}