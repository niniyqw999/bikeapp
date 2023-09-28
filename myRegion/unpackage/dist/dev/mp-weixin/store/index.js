"use strict";
const common_vendor = require("../common/vendor.js");
const uni_modules_piniaPluginUnistorage_index = require("../uni_modules/pinia-plugin-unistorage/index.js");
const store = common_vendor.createPinia();
store.use(uni_modules_piniaPluginUnistorage_index.createUnistorage());
exports.store = store;
