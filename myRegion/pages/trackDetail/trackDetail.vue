<template>
	<view>
		<map style="width: 100%; height: 1400rpx;" :latitude="mapOptions.latitude" :longitude="mapOptions.longitude"
			:show-location="true" :polygons="mapOptions.polygons" :scale="15" :polyline="mapOptions.polyline">
		</map>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		getTrack
	} from '../../untils/request.js'

	//地图属性配置
	const mapOptions = reactive({
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
		polyline: [{
			points: [{
					latitude: 30.425455,
					longitude: 114.437376
				},
				{
					latitude: 30.423755,
					longitude: 114.434676
				},
				{
					latitude: 30.410802,
					longitude: 114.431879
				},
			],
			color: "#1296db",
			width: "3",
			arrowLine: true,
		}],
	})
	//存储当前页面轨迹id
	let params = reactive({})
	//接受上个页面传来的参数
	onLoad((options) => {
		console.log('接收传值：', options)
		params = options
	});
	//获取轨迹数据
	onMounted(() => {
		getTrack(params).then((res) => {
			if (res.data.code === 200) {
				//解构出轨迹数组
				const {
					tracks
				} = res.data.data[0]
				mapOptions.polyline[0].points = tracks
				console.log("获取轨迹成功")
				console.log(tracks)
			} else {
				console.log('获取失败')
			}
		})
	})
</script>

<style>

</style>