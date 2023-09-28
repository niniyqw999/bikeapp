"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://100.87.56.58:3000/";
function loginPhone(data) {
  return common_vendor.index.request({
    url: baseURL + "region/user",
    method: "POST",
    data
  });
}
function saveTrack(data) {
  return common_vendor.index.request({
    url: baseURL + "region/savetracks",
    method: "POST",
    data
  });
}
function getTrack(data) {
  return common_vendor.index.request({
    url: baseURL + "region/gettracks",
    method: "GET",
    data
  });
}
function delTrack(id) {
  return common_vendor.index.request({
    url: baseURL + "region/deltracks/" + id,
    method: "DELETE"
  });
}
exports.delTrack = delTrack;
exports.getTrack = getTrack;
exports.loginPhone = loginPhone;
exports.saveTrack = saveTrack;
