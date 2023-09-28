<template>
	<map style="width: 100%; height: 730rpx;" :latitude="mapOptions.latitude"
		:longitude="mapOptions.longitude" :show-location="true" :polygons="mapOptions.polygons" :scale="15"
		:markers="mapOptions.markers">
	</map>
	<uni-card :title="`单车${index+1}`" sub-title="电量:有" extra="普通单车" thumbnail="https://img1.baidu.com/it/u=2652190472,835620995&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400" v-for="(user,index) in userList"
		:key="user._id" @click="gouserDetail(user.phoneNumber)">
		<text class="uni-body">点击查看单车详细信息</text>
		<image src="../../static/删除.png" style="height: 40rpx;width: 40rpx;position: absolute;left: 600rpx;"
			@click.stop="del(user.phoneNumber)" class="trash"></image>
	</uni-card>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	import {
		getUser,delUser
	} from '../../untils/request.js'
	
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
	//存储用户信息
	let userList = ref([])
	onMounted(() => {
		//获取用户信息
		getUser().then((res) => {
			userList.value = res.data.data
			console.log(res.data.data)
			console.log('获取用户列表成功')
		})
	})
	//点击用户卡片的回调
	const gouserDetail=(phone)=>{
		uni.navigateTo({
			url: "/pages/userDetail/userDetail?phone=" + phone
		})
	}
	//点击删除图标的回调
	const del = (phone) => {
		delUser(phone).then((res) => {
			if (res.data.code === 200) {
				//删除后重新获取列表数据
				getUser().then((res) => {
						userList.value = res.data.data
				})
				console.log('删除成功')
			}
			uni.showToast({
				title: "删除成功",
				duration: 2000
			})
		})
	}
</script>

<style>

</style>