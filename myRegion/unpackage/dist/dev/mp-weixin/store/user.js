"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore(
  "user",
  {
    state: () => {
      return {
        userInfo: {},
        token: ""
      };
    },
    actions: {
      //设置token
      setToken(token, userForm) {
        this.token = token;
        this.userInfo = userForm;
        console.log(userForm);
      },
      //清除token
      clearToken() {
        this.token = "";
        this.userInfo = {};
      }
    }
  },
  {
    unistorage: true
    // 开启后对 state 的数据读写都将持久化
  }
);
exports.useUserStore = useUserStore;
