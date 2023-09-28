"use strict";
const common_vendor = require("../../common/vendor.js");
const untils_request = require("../../untils/request.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const mapOptions = {
      id: 0,
      // 使用 marker点击事件 需要填写id
      latitude: 30.418,
      // 地图默认显示的维度
      longitude: 114.436,
      // 地图默认显示的纬度
      polygons: [{
        //在地图上圈出范围
        points: [
          {
            //四个点画出矩形范围
            latitude: 30.424144,
            longitude: 114.435865
          },
          //上右下左
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
          }
        ],
        strokeWidth: "3",
        //范围边框宽度
        strokeColor: "#ff4921"
        //范围边框颜色
      }],
      markers: [{
        id: 1,
        latitude: 30.422345,
        longitude: 114.434888,
        iconPath: "../../static/定位.png",
        title: "单车1",
        callout: {
          content: "单车1",
          color: "#ff4921",
          fontSize: "30rpx",
          display: "ALWAYS"
        }
      }, {
        id: 2,
        latitude: 30.422772,
        longitude: 114.434367,
        iconPath: "../../static/定位.png",
        title: "单车2",
        callout: {
          content: "单车2",
          color: "#ff4921",
          fontSize: "30rpx",
          display: "ALWAYS"
        }
      }, {
        id: 3,
        latitude: 30.422678,
        longitude: 114.434345,
        iconPath: "../../static/定位.png",
        title: "单车3",
        callout: {
          content: "单车3",
          color: "#ff4921",
          fontSize: "30rpx",
          display: "ALWAYS"
        }
      }]
    };
    let userList = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      untils_request.getUser().then((res) => {
        userList.value = res.data.data;
        console.log(res.data.data);
        console.log("获取用户列表成功");
      });
    });
    const gouserDetail = (phone) => {
      common_vendor.index.navigateTo({
        url: "/pages/userDetail/userDetail?phone=" + phone
      });
    };
    const del = (phone) => {
      untils_request.delUser(phone).then((res) => {
        if (res.data.code === 200) {
          untils_request.getUser().then((res2) => {
            userList.value = res2.data.data;
          });
          console.log("删除成功");
        }
        common_vendor.index.showToast({
          title: "删除成功",
          duration: 2e3
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: mapOptions.latitude,
        b: mapOptions.longitude,
        c: mapOptions.polygons,
        d: mapOptions.markers,
        e: common_vendor.f(common_vendor.unref(userList), (user, index, i0) => {
          return {
            a: common_vendor.o(($event) => del(user.phoneNumber), user._id),
            b: user._id,
            c: common_vendor.o(($event) => gouserDetail(user.phoneNumber), user._id),
            d: "4f514d01-0-" + i0,
            e: common_vendor.p({
              title: `单车${index + 1}`,
              ["sub-title"]: "电量:有",
              extra: "普通单车",
              thumbnail: "https://img1.baidu.com/it/u=2652190472,835620995&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/admin/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
