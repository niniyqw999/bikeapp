"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "myself",
  setup(__props) {
    const user = store_user.useUserStore();
    const goLogin = () => {
      if (!user.token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    const logout = () => {
      user.clearToken();
      console.log("退出登录");
    };
    const goTrack = () => {
      if (user.token) {
        common_vendor.index.navigateTo({
          url: "/pages/track/track"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(user).token
      }, !common_vendor.unref(user).token ? {} : {}, {
        b: common_vendor.unref(user).token
      }, common_vendor.unref(user).token ? {
        c: common_vendor.t(common_vendor.unref(user).userInfo.phoneNumber)
      } : {}, {
        d: common_vendor.unref(user).token
      }, common_vendor.unref(user).token ? {
        e: common_vendor.o(logout)
      } : {}, {
        f: common_vendor.o(goLogin),
        g: common_vendor.o(goTrack)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/myRegion/pages/myself/myself.vue"]]);
wx.createPage(MiniProgramPage);
