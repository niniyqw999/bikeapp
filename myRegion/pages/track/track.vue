<template>
	<view>
		<view class="header">
			<view>
				<view class="picture">
					<image src="../../static/我的-高亮.png" mode="widthFix" style="width: 100%;"></image>
				</view>
			</view>
		</view>
		<uni-card :title="`轨迹${index+1}`" :extra="friendlyDate(item.time,{
				type: String,
				default: 'zh',
			})" @click="gotrackDetail(item._id)" v-for="(item,index) in trackList" :key="item._id">
			<text>距离:{{getDistance(item.tracks[0].latitude,item.tracks[0].longitude,item.tracks[item.tracks.length-1].latitude,item.tracks[item.tracks.length-1].longitude).toFixed(2)}}米</text>
			<image src="../../static/删除.png" style="height: 40rpx;width: 40rpx;position: absolute;left: 600rpx;"
				@click.stop="del(item._id)" class="trash"></image>
		</uni-card>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import {
		getTrack,
		delTrack
	} from '../../untils/request.js'
	import {
		getDistance
	} from '../../untils/distance.js'
	import {
		friendlyDate
	} from '../../uni_modules/uni-dateformat/components/uni-dateformat/date-format.js'
	import {
		useUserStore
	} from '../../store/user.js'
	//存储pinia里的用户信息
	const user = useUserStore()
	//存储所有轨迹的列表
	let trackList = ref([])

	onMounted(() => {
		//渲染轨迹列表数据
		getTrack({phoneNumber:user.userInfo.phoneNumber}).then((res) => {
			console.log(res.data);
			if (res.data.code === 200) {
				trackList.value = res.data.data
				console.log("获取轨迹成功")
				console.log(trackList)
			} else {
				console.log('获取失败')
			}
		})
	})
	//点击轨迹进入详情页面
	const gotrackDetail = (id) => {
		uni.navigateTo({
			url: "/pages/trackDetail/trackDetail?id=" + id
		})
	}
	//点击删除图标的回调
	const del = (id) => {
		delTrack(id).then((res) => {
			if (res.data.code === 200) {
				//删除后重新获取列表数据
				getTrack({phoneNumber:user.userInfo.phoneNumber}).then((res) => {
					if (res.data.code === 200) {
						trackList.value = res.data.data
					}
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
	.header {
		width: 100%;
		height: 500rpx;
		background-color: #1296db;
		border-radius: 0 0 5% 5%;
		margin-bottom: 40rpx;
		box-shadow: 0 2rpx 10rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.picture {
		height: 200rpx;
		width: 200rpx;
		border-radius: 50%;
		background-color: white;
	}
</style>