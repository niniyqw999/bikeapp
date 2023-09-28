<template>
	<view>
		<view class="page-body">
			<view>
				<map style="width: 100%; height: 1330rpx;" :latitude="mapOptions.latitude"
					:longitude="mapOptions.longitude" :show-location="true" :polygons="mapOptions.polygons" :scale="15"
					:markers="mapOptions.markers">
				</map>
			</view>
		</view>
		<view class="Button">
			<button type="primary" plain="true" class="bButton" @click="start"
				style="color:#1296db ;border-color: #1296db;">开始监测</button>
			<button type="primary" plain="true" class="bButton" @click="over"
				style="color:#1296db ;border-color: #1296db;">停止监测</button>
		</view>
		<!-- <view class="Button">
			<button type="primary" plain="true" class="sButton"></button>
			<button type="primary" plain="true" class="sButton"></button>
			<button type="primary" plain="true" class="sButton"></button>
			<button type="primary" plain="true" class="sButton"></button>
		</view> -->
	</view>
</template>

<script setup>
	import {
		saveTrack
	} from '../../untils/request.js'
	import {
		isPointInPolygon,
		getDistanceFromLine
	} from 'geolib';
	import {
		useUserStore
	} from '../../store/user.js'
	import {
		onMounted
	} from "vue";
	//存储pinia里的用户信息
	const user = useUserStore()
	let timer //先定义定时器
	//地图属性配置
	const mapOptions = {
		id: 0, // 使用 marker点击事件 需要填写id
		latitude: 30.418, // 地图默认显示的维度
		longitude: 114.436, // 地图默认显示的纬度
		polygons: [{ //在地图上圈出范围
			points: [{ //四个点画出矩形范围
					latitude: 30.424144,
					longitude: 114.435865
				}, //上右下左
				{
					latitude: 30.419343,
					longitude: 114.442554
				},
				{
					latitude: 30.410472,
					longitude: 114.431747
				},
				{
					latitude: 30.41518,
					longitude: 114.42597
				},
			],
			strokeWidth: "3", //范围边框宽度
			strokeColor: "#ff4921", //范围边框颜色
		}, ],
		markers: [{
			id:1,
			latitude: 30.422345,
			longitude: 114.434888,
			iconPath: "../../static/定位.png",
			title: '单车1',
			callout:{
				content:"单车1",
				color:"#ff4921",
				fontSize:'30rpx',
				display:'ALWAYS'
			}
		}, {
			id:2,
			latitude: 30.422772,
			longitude: 114.434367,
			iconPath: "../../static/定位.png",
			title: '单车2',
			callout:{
				content:"单车2",
				color:"#ff4921",
				fontSize:'30rpx',
				display:'ALWAYS'
			}
		}, {
			id:3,
			latitude: 30.422678,
			longitude: 114.434345,
			iconPath: "../../static/定位.png",
			title: '单车3',
			callout:{
				content:"单车3",
				color:"#ff4921",
				fontSize:'30rpx',
				display:'ALWAYS'
			}
		}]
	}
	//定义音乐
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = false;
	innerAudioContext.src = 'https://downsc.chinaz.net/Files/DownLoad/sound1/202301/y1469.mp3';
	innerAudioContext.loop = true;

	//存储定位数据即轨迹
	let tracks = []
	//点击开始监测的回调
	const start = () => {
		if (!user.token) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		} else {
			if (timer) {
				clearInterval(timer)
			} else {
				uni.showToast({
					title: '开始监测',
					duration: 2000
				});
				timer = setInterval(() => {
					console.log('开始监测')

					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							console.log('当前位置的纬度：' + res.latitude);
							console.log('当前位置的经度：' + res.longitude);
							let point = {
								latitude: res.latitude,
								longitude: res.longitude
							}
							console.log("当前位置:", point)
							//数组插入经纬度
							tracks.push(point)
							//判断是否超出范围或是距离50米
							isPointInRectangle(point, { //四个点画出矩形范围
									latitude: 30.424144,
									longitude: 114.435865
								}, //上右下左
								{
									latitude: 30.419343,
									longitude: 114.442554
								}, {
									latitude: 30.410472,
									longitude: 114.431747
								}, {
									latitude: 30.41518,
									longitude: 114.42597
								},
							)
						},
						fail: (err) => {
							console.log('定位失败：', err)
						}
					});
				}, 2000)
			}
		}
	}

	//点击停止监测的回调
	const over = () => {
		if (timer) {
			clearInterval(timer)
			timer = null
			console.log('停止监测')
			innerAudioContext.pause()
			uni.showToast({
				title: '停止监测',
				duration: 2000
			});
			saveTrack({
				phoneNumber: user.userInfo.phoneNumber,
				tracks
			}).then((res) => {
				if (res.data.code === 200) {
					console.log('保存成功')
					console.log(tracks);
					//清空数组
					tracks = []
				}
			})
		} else {
			console.log('还没开始监测')
			uni.showToast({
				title: '还没开始监测',
				duration: 2000
			});
		}
	}

	//判断范围和50mi
	const isPointInRectangle = (point, A, B, C, D) => {
		// let longitude = point.longitude;
		// let latitude = point.latitude;
		// console.log(longitude - A.longitude - (1.10386 * (latitude - A.latitude)))
		//自己写的判断方法
		// if (longitude - A.longitude - (1.10386 * (latitude - A.latitude)) > 0 && longitude - A.longitude - (-1.393251 *
		// 		(
		// 			latitude - A.latitude)) < 0 && longitude - B.longitude - (1.218239 * (latitude - B.latitude)) <
		// 	0 &&
		// 	longitude - D.longitude - (-1.22706 * (latitude - D.latitude)) > 0) 
		//库引用的方法
		if (isPointInPolygon(point, [A, B, C, D])) {
			// 经度和纬度在范围内
			let distance = calculateDistanceToRectangle(point, A, B, C, D);
			if (distance <= 50) {
				// 距离边界还有50米
				innerAudioContext.play() //警告声播放
				if (distance <= 10) {
					//距离边界还有10米

					uni.showToast({
						title: "10米内即将超",
						duration: 1000
					})
					console.log('10米内即将超出安全范围');
				} else {
					uni.showToast({
						title: "50米内即将超",
						duration: 1000
					})
					console.log('50米内即将超出安全范围');
				}
			} else {
				// 距离超过50米
				console.log('在安全范围内且未到50米附近');
			}
		} else {
			// 经度或纬度超出范围
			uni.showToast({
				title: "已超出安全范围",
				duration: 1000
			})
			console.log('已经超出安全范围');
		}
	}
	//计算与四条边的距离
	const calculateDistanceToRectangle = (point, A, B, C, D) => {
		// 计算点到矩形的最近边界的距离
		// 这里使用了简化的计算方法，实际上应该考虑地球曲率和投影等因素
		let distances = [
			getDistanceFromLine(point, A, B),
			getDistanceFromLine(point, B, C),
			getDistanceFromLine(point, C, D),
			getDistanceFromLine(point, D, A)
		];
		console.log('到每条边的距离', ...distances)
		return Math.min(...distances);
	}
</script>

<style>
	.Button {
		display: flex;
		align-items: center;
		margin: 30rpx 0;
	}

	.bButton {
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 20rpx;
	}

	/* .sButton {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	} */

	page {
		background-color: #f8f8f8;
	}
</style>