export function isPointInRectangle(point, A, B, C, D) {
  let longitude = point.longitude;
  let latitude = point.latitude;

  if (longitude >= Math.min(A.longitude, B.longitude) && longitude <= Math.max(A.longitude, B.longitude) &&
      latitude >= Math.min(A.latitude, D.latitude) && latitude <= Math.max(A.latitude, D.latitude)) {
    // 经度和纬度在范围内
    let distance = calculateDistanceToRectangle(point, A, B, C, D);
    if (distance <= 50) {
      // 距离边界还有50米
	  uni.showToast({
	  	title:"50米内即将超",
		duration:1000
	  })
      console.log('50米内即将超出安全范围');
    } else {
      // 距离超过50米
      console.log('在安全范围内且未到50米附近');
    }
  } else {
    // 经度或纬度超出范围
	uni.showToast({
		title:"已超出安全范围",
			duration:1000
	})
    console.log('已经超出安全范围');
  }
}

export function calculateDistanceToRectangle(point, A, B, C, D) {
  // 计算点到矩形的最近边界的距离
  // 这里使用了简化的计算方法，实际上应该考虑地球曲率和投影等因素
  let distances = [
    calculateDistanceToLine(point, A, B),
    calculateDistanceToLine(point, B, C),
    calculateDistanceToLine(point, C, D),
    calculateDistanceToLine(point, D, A)
  ];
  console.log("当前位置距离四条边的距离:",...distances)
  return Math.min(...distances);
}

export function calculateDistanceToLine(point, start, end) {
  // 计算点到线段的距离
  // 这里使用了简化的计算方法，实际上应该考虑地球曲率和投影等因素
  let [x1, y1] = start;
  let [x2, y2] = end;
  let [x, y] = point;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let u = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
  let closestX, closestY;
  if (u < 0) {
    closestX = x1;
    closestY = y1;
  } else if (u > 1) {
    closestX = x2;
    closestY = y2;
  } else {
    closestX = x1 + u * dx;
    closestY = y1 + u * dy;
  }
  let distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);
  return distance;
}

// // 示例使用
// let A = [-74.0060, 40.7128];
// let B = [-73.9957, 40.7128];
// let C = [-73.9957, 40.7213];
// let D = [-74.0060, 40.7213];

// let point = [-73.9984, 40.7168];

// // if (isPointInRectangle(point, A, B, C, D)) {
//   console.log("点在矩形范围内，并且距离边界还有50米");
// } else {
//   console.log("点不在矩形范围内或者距离边界超过50米");
// }