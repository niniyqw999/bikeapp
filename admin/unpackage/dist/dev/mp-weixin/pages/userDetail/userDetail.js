"use strict";
const common_vendor = require("../../common/vendor.js");
const untils_request = require("../../untils/request.js");
const uni_modules_uniDateformat_components_uniDateformat_dateFormat = require("../../uni_modules/uni-dateformat/components/uni-dateformat/date-format.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
const _sfc_main = {
  __name: "userDetail",
  setup(__props) {
    let params = common_vendor.reactive({});
    common_vendor.onLoad((options) => {
      console.log("接收传值：", options);
      params = options;
    });
    let trackList = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      untils_request.getTrack({ phoneNumber: params.phone }).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          trackList.value = res.data.data;
          console.log("获取轨迹成功");
          console.log(trackList);
        } else {
          console.log("获取失败");
        }
      });
    });
    const del = (id) => {
      untils_request.delTrack(id).then((res) => {
        if (res.data.code === 200) {
          untils_request.getTrack({ phoneNumber: params.phone }).then((res2) => {
            if (res2.data.code === 200) {
              trackList.value = res2.data.data;
            }
          });
          console.log("删除成功");
        }
        common_vendor.index.showToast({
          title: "删除成功",
          duration: 2e3
        });
      });
    };
    const gotrackDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/trackDeatil/trackDeatil?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(params).phone),
        b: common_vendor.f(common_vendor.unref(trackList), (item, index, i0) => {
          return {
            a: common_vendor.t(common_vendor.unref(untils_request.getDistance)(item.tracks[0].latitude, item.tracks[0].longitude, item.tracks[item.tracks.length - 1].latitude, item.tracks[item.tracks.length - 1].longitude).toFixed(2)),
            b: common_vendor.o(($event) => del(item._id), item._id),
            c: common_vendor.o(($event) => gotrackDetail(item._id), item._id),
            d: item._id,
            e: "2732119b-0-" + i0,
            f: common_vendor.p({
              title: `轨迹${index + 1}`,
              ["sub-title"]: "超出范围:否",
              extra: common_vendor.unref(uni_modules_uniDateformat_components_uniDateformat_dateFormat.friendlyDate)(item.time, {
                type: String,
                default: "zh"
              })
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/wxapp/bikeApp/admin/pages/userDetail/userDetail.vue"]]);
wx.createPage(MiniProgramPage);
