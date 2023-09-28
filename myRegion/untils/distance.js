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

// // 示例用法
// const lat1 = 39.9; // 第一个点的纬度
// const lon1 = 116.4; // 第一个点的经度
// const lat2 = 40.0; // 第二个点的纬度
// const lon2 = 116.5; // 第二个点的经度

// const distance = getDistance(lat1, lon1, lat2, lon2);
// console.log(distance); // 输出两个点之间的距离（单位为米）

// 将经纬度度数转换为米
export const convertDistanceToMeters = (distance, latitude) => {
  const earthRadius = 6371000; // 地球半径（单位：米）
  const latitudeInRadians = latitude * (Math.PI / 180); // 将纬度转换为弧度

  // 根据纬度计算纬度圈的半径
  const latitudeCircleRadius = earthRadius * Math.cos(latitudeInRadians);

  // 将经纬度度数距离乘以纬度圈的半径得到距离（单位：米）
  const distanceInMeters = distance * latitudeCircleRadius;

  return distanceInMeters;
}

// // 示例使用
// const distanceInDegrees = 0.01; // 经纬度度数距离
// const latitude = 40.7128; // 线段起点的纬度

// const distanceInMeters = convertDistanceToMeters(distanceInDegrees, latitude);
// console.log(distanceInMeters); // 输出距离（单位：米）