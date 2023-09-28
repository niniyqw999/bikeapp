"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://100.87.56.58:3000/";
function getUser() {
  return common_vendor.index.request({
    url: baseURL + "region/getusers",
    method: "GET"
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
function delUser(phone) {
  return common_vendor.index.request({
    url: baseURL + "region/deluser/" + phone,
    method: "DELETE"
  });
}
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
exports.delTrack = delTrack;
exports.delUser = delUser;
exports.getDistance = getDistance;
exports.getTrack = getTrack;
exports.getUser = getUser;
