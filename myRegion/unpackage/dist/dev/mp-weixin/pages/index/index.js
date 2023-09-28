"use strict";
const common_vendor = require("../../common/vendor.js");
const untils_request = require("../../untils/request.js");
const store_user = require("../../store/user.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const user = store_user.useUserStore();
    let timer;
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
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = "https://downsc.chinaz.net/Files/DownLoad/sound1/202301/y1469.mp3";
    innerAudioContext.loop = true;
    let tracks = [];
    const start = () => {
      if (!user.token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      } else {
        if (timer) {
          clearInterval(timer);
        } else {
          common_vendor.index.showToast({
            title: "开始监测",
            duration: 2e3
          });
          timer = setInterval(() => {
            console.log("开始监测");
            common_vendor.index.getLocation({
              type: "gcj02",
              success: function(res) {
                console.log("当前位置的纬度：" + res.latitude);
                console.log("当前位置的经度：" + res.longitude);
                let point = {
                  latitude: res.latitude,
                  longitude: res.longitude
                };
                console.log("当前位置:", point);
                tracks.push(point);
                isPointInRectangle(
                  point,
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
                );
              },
              fail: (err) => {
                console.log("定位失败：", err);
              }
            });
          }, 2e3);
        }
      }
    };
    const over = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
        console.log("停止监测");
        innerAudioContext.pause();
        common_vendor.index.showToast({
          title: "停止监测",
          duration: 2e3
        });
        untils_request.saveTrack({
          phoneNumber: user.userInfo.phoneNumber,
          tracks
        }).then((res) => {
          if (res.data.code === 200) {
            console.log("保存成功");
            console.log(tracks);
            tracks = [];
          }
        });
      } else {
        console.log("还没开始监测");
        common_vendor.index.showToast({
          title: "还没开始监测",
          duration: 2e3
        });
      }
    };
    const isPointInRectangle = (point, A, B, C, D) => {
      if (common_vendor.es.isPointInPolygon(point, [A, B, C, D])) {
        let distance = calculateDistanceToRectangle(point, A, B, C, D);
        if (distance <= 50) {
          innerAudioContext.play();
          if (distance <= 10) {
            common_vendor.index.showToast({
              title: "10米内即将超",
              duration: 1e3
            });
            console.log("10米内即将超出安全范围");
          } else {
            common_vendor.index.showToast({
              title: "50米内即将超",
              duration: 1e3
            });
            console.log("50米内即将超出安全范围");
          }
        } else {
          console.log("在安全范围内且未到50米附近");
        }
      } else {
        common_vendor.index.showToast({
          title: "已超出安全范围",
          duration: 1e3
        });
        console.log("已经超出安全范围");
      }
    };
    const calculateDistanceToRectangle = (point, A, B, C, D) => {
      let distances = [
        common_vendor.es.getDistanceFromLine(point, A, B),
        common_vendor.es.getDistanceFromLine(point, B, C),
        common_vendor.es.getDistanceFromLine(point, C, D),
        common_vendor.es.getDistanceFromLine(point, D, A)
      ];
      console.log("到每条边的距离", ...distances);
      return Math.min(...distances);
    };
    return (_ctx, _cache) => {
      return {
        a: mapOptions.latitude,
        b: mapOptions.longitude,
        c: mapOptions.polygons,
        d: mapOptions.markers,
        e: common_vendor.o(start),
        f: common_vendor.o(over)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/myRegion/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
