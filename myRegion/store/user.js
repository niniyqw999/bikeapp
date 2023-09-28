import {
	defineStore
} from 'pinia'

export const useUserStore = defineStore(
	'user', {
		state: () => {
			return {
				userInfo: {},
				token: ''
			}
		},
		actions: {
			//设置token
			setToken(token,userForm){
				this.token=token;
				this.userInfo=userForm;
				console.log(userForm)
			},
			//清除token
			clearToken(){
				this.token='';
				this.userInfo={};
			}
		}
	}, {
		unistorage: true // 开启后对 state 的数据读写都将持久化
	}
)