<template>
	<view>
		<view class="header">
			<view @click="goLogin">
				<view class="picture">
					<image src="../../static/我的-高亮.png" mode="widthFix" style="width: 100%;"></image>
				</view>
				<view style="font-size: 40rpx;margin-top: 20rpx;color: white;" v-if="!user.token">点击登录账户</view>
				<view style="position:absolute;left:20%;">
					<view style="font-size: 40rpx;margin-top: 20rpx;color: white;" v-if="user.token">用户{{user.userInfo.phoneNumber}}已登录</view>
					<view style="font-size: 40rpx;margin-top: 20rpx;color: white;" v-if="user.token" @click="logout">退出登录</view>
				</view>
			</view>
		</view>
		<view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					我的钱包
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					我的优惠券
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					会员卡
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					骑行套餐
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					我的消息
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					我的反馈
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					账单明细
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu" @click="goTrack">
				<view>
					<image src="../../static/自行车.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					骑行记录
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					用户协议
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
			<view class="menu">
				<view>
					<image src="../../static/调试.png" style="height: 40rpx;width: 40rpx;margin: 0 20rpx;"></image>
					用户设置
				</view>
				<view>
					<image src="../../static/进入箭头.png" style="height: 70rpx;width: 60rpx;margin-right:20rpx"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useUserStore
	} from '../../store/user.js'
	//存储pinia里的用户信息
	const user = useUserStore()
	//未登录点击头像的回调
	const goLogin = () => {
		if (!user.token) {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
	//点击退出登录的回调
	const logout = () =>{
		user.clearToken()
		console.log("退出登录")
	}
	//点击轨迹记录的回调
	const goTrack = () => {
		if (user.token) {
			uni.navigateTo({
				url: '/pages/track/track'
			})
		} else {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: 500rpx;
		background-color: #1296db;
		border-radius: 5%;
		margin-bottom: 40rpx;
		box-shadow: 0 0 10rpx 2rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		position: relative;
	}

	.menu {
		width: 100%;
		height: 100rpx;
		background-color: white;
		margin-top: 20rpx;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.picture {
		height: 200rpx;
		width: 200rpx;
		border-radius: 50%;
		background-color: white;
	}

	page {
		background-color: #f8f8f8;
	}
</style>