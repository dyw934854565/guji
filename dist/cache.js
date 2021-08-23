'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventCache = undefined;
exports.default = cache;

var _getType = require('./getType');

// 特殊返回preventCache作为key，可以禁用缓存，用对象保证唯一性
const preventCache = exports.preventCache = Object.create(null);
function cache(fn, _thisArg, { resetReject = true, keyFn, msMaxAge = 0 } = {}) {
  // 结果缓存结果的map
  let res = {};
  // 结果缓存的时间
  let isCached = {};
  const cachedFn = function (...args) {
    const key = (0, _getType.isType)(keyFn, 'function') ? keyFn(...args) : keyFn;
    if (key === preventCache) {
      return fn.apply(_thisArg || this, args);
    }
    // 有缓存，并且在有效期，直接返回缓存结果
    if (isCached[key] && (msMaxAge <= 0 || Date.now() - isCached[key] <= msMaxAge)) {
      return res[key];
    }
    res[key] = fn.apply(_thisArg || this, args);
    isCached[key] = Date.now();
    // 缓存的结果是promise，并且需要在reject的时候去删除缓存，这样重新请求的时候，能正常发请求
    if (resetReject && ((0, _getType.isType)(res[key], 'promise') || res[key] && res[key].then && res[key].catch)) {
      res[key].catch(e => {
        delete res[key];
        delete isCached[key];
      });
    }
    return res[key];
  };
  // 可以手动清除缓存
  cachedFn.clearCache = function (key) {
    if (typeof key !== 'undefined') {
      delete isCached[key];
    } else {
      isCached = {};
    }
  };
  return cachedFn;
}