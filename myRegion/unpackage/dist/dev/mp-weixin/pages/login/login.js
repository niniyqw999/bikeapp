"use strict";
const common_vendor = require("../../common/vendor.js");
const store_user = require("../../store/user.js");
const untils_request = require("../../untils/request.js");
if (!Array) {
  const _component_uv_alert = common_vendor.resolveComponent("uv-alert");
  _component_uv_alert();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const user = store_user.useUserStore();
    let userForm = common_vendor.reactive({
      phoneNumber: "18372878358",
      password: "123456"
    });
    const loginForm = () => {
      if (userForm.phoneNumber.length !== 11 || userForm.password.length < 6) {
        console.log("请输入正确的手机号或密码");
      } else {
        console.log("提交表单");
        untils_request.loginPhone(userForm).then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            let token = "nini";
            user.setToken(token, userForm);
            console.log("登录成功");
            common_vendor.index.switchTab({
              url: "/pages/myself/myself"
            });
            common_vendor.index.showToast({
              title: "登录成功",
              duration: 2e3
            });
          } else if (res.data.code === 400) {
            console.log("手机号或密码错误");
            common_vendor.index.showToast({
              title: "手机号或密码错误",
              duration: 2e3
            });
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userForm).phoneNumber,
        b: common_vendor.o(($event) => common_vendor.unref(userForm).phoneNumber = $event.detail.value),
        c: common_vendor.unref(userForm).password,
        d: common_vendor.o(($event) => common_vendor.unref(userForm).password = $event.detail.value),
        e: common_vendor.o(loginForm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/myRegion/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
