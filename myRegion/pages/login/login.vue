<template>
	<view class="container">
		<uv-alert></uv-alert>
		<view class="container-bg"></view>
		<view class="container-form">
			<view class="container-form-item">
				<input type="number" placeholder="请输入手机号" v-model="userForm.phoneNumber" />
			</view>
			<view class="container-form-item">
				<input type="password" class="container-form-item-input" placeholder="请输入登录密码至少6位"
					v-model="userForm.password" />
			</view>
			<button class="container-form-submit" @click="loginForm">登录/注册</button>
		</view>
	</view>
</template>

<script setup>
	import {
		useUserStore
	} from '../../store/user.js';
	import {
		reactive
	} from "vue";
	import {loginPhone} from '../../untils/request.js';
	//存储仓库中的用户信息
	const user = useUserStore();
	//存储表单信息
	let userForm = reactive({
		phoneNumber: '18372878358',
		password: '123456'
	})
	//点击登录按钮的回调
	const loginForm = () => {
		if (userForm.phoneNumber.length !== 11 || userForm.password.length < 6) {
			console.log('请输入正确的手机号或密码');
		} else {
			console.log("提交表单");
			loginPhone(userForm).then((res) => {
				console.log(res.data);
				if (res.data.code ===200) {
					let token = "nini";
					user.setToken(token, userForm);
					console.log('登录成功');
					uni.switchTab({
						url: "/pages/myself/myself",
					});
					uni.showToast({
						title:'登录成功',
						duration:2000
					})
				} else if(res.data.code === 400) {
					console.log('手机号或密码错误');
					uni.showToast({
						title:'手机号或密码错误',
						duration:2000
					})
				}
			})
		}
	}
</script>

<style lang="less">
	.container {
		background-color: #F6F6F6;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		&-bg {
			width: 100%;
			height: 50%;
			background-color: #1296db;
			border-bottom-left-radius: 10%;
			border-bottom-right-radius: 10%;
			position: absolute;
			top: 0;
			z-index: 1;
		}

		&-form {
			width: 90%;
			background-color: white;
			box-sizing: border-box;
			padding: 80rpx 20rpx;
			border-radius: 5%;
			z-index: 1;

			&-item {
				display: flex;
				flex-direction: row;
				padding: 60rpx 0;
				border-bottom: 1px solid gainsboro;

				.iconfont {
					font-size: 40rpx;
					margin-right: 10rpx;
					margin-top: 5rpx;
				}

				&-input {
					width: 70%;
					margin-right: 10%;
				}
			}

			&-submit {
				margin-top: 100rpx !important;
				color: white;
				background-color: #1296db;
				border: none;
			}
		}
	}
</style>