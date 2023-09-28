"use strict";
const common_vendor = require("../../common/vendor.js");
const untils_request = require("../../untils/request.js");
const _sfc_main = {
  __name: "trackDeatil",
  setup(__props) {
    const mapOptions = common_vendor.reactive({
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
      polyline: [{
        points: [
          {
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
          }
        ],
        color: "#1296db",
        width: "3",
        arrowLine: true
      }]
    });
    let params = common_vendor.reactive({});
    common_vendor.onLoad((options) => {
      console.log("接收传值：", options);
      params = options;
    });
    common_vendor.onMounted(() => {
      untils_request.getTrack(params).then((res) => {
        if (res.data.code === 200) {
          const {
            tracks
          } = res.data.data[0];
          mapOptions.polyline[0].points = tracks;
          console.log("获取轨迹成功");
          console.log(tracks);
        } else {
          console.log("获取失败");
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: mapOptions.latitude,
        b: mapOptions.longitude,
        c: mapOptions.polygons,
        d: mapOptions.polyline
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/admin/pages/trackDeatil/trackDeatil.vue"]]);
wx.createPage(MiniProgramPage);
