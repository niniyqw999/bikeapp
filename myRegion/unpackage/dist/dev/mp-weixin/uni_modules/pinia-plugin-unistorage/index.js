"use strict";
const common_vendor = require("../../common/vendor.js");
function get(state, path) {
  return path.reduce((obj, p) => {
    return obj == null ? void 0 : obj[p];
  }, state);
}
function set(state, path, val) {
  return path.slice(0, -1).reduce((obj, p) => {
    if (!/^(__proto__)$/.test(p))
      return obj[p] = obj[p] || {};
    else
      return {};
  }, state)[path[path.length - 1]] = val, state;
}
function pick(baseState, paths) {
  return paths.reduce((substate, path) => {
    const pathArray = path.split(".");
    return set(
      substate,
      pathArray,
      get(baseState, pathArray)
    );
  }, {});
}
const isObject = (v) => typeof v === "object" && v !== null;
const normalizeOptions = (options, globalOptions) => {
  options = isObject(options) ? options : /* @__PURE__ */ Object.create(null);
  return new Proxy(options, {
    get(t, p, r) {
      return Reflect.get(t, p, r) || Reflect.get(globalOptions, p, r);
    }
  });
};
function passage(key) {
  return key;
}
function createUnistorage(globalOptions = {}) {
  const { key: normalizeKey = passage } = globalOptions || {};
  if (globalOptions == null ? void 0 : globalOptions.key) {
    delete globalOptions.key;
  }
  return function(ctx) {
    {
      const { store, options } = ctx;
      let { unistorage } = options || {};
      if (!unistorage)
        return;
      const {
        paths = null,
        afterRestore,
        beforeRestore,
        serializer = {
          serialize: JSON.stringify,
          deserialize: JSON.parse
        },
        key = store.$id
      } = normalizeOptions(unistorage, globalOptions);
      beforeRestore == null ? void 0 : beforeRestore(ctx);
      const normalizedKey = normalizeKey(key);
      try {
        const fromStorage = common_vendor.index.getStorageSync(normalizedKey);
        if (fromStorage) {
          store.$patch(serializer.deserialize(fromStorage));
        }
      } catch (_error) {
      }
      afterRestore == null ? void 0 : afterRestore(ctx);
      store.$subscribe(
        (_, state) => {
          try {
            const toStore = Array.isArray(paths) ? pick(state, paths) : state;
            common_vendor.index.setStorageSync(
              normalizedKey,
              serializer.serialize(toStore)
            );
          } catch (_error) {
          }
        },
        { detached: true }
      );
    }
  };
}
exports.createUnistorage = createUnistorage;
