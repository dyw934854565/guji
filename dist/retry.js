"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = retry;

var _getType = require("./getType");

function retry(fn, retryTimes = 2, _this, onerror = console.log) {
  return function (...args) {
    let res;
    try {
      res = fn.apply(_this || this, args);
    } catch (e) {
      if (retryTimes <= 1) {
        return Promise.reject(e);
      }
      onerror && onerror(e);
      return retry(fn, retryTimes - 1, _this, onerror)(...args);
    }
    if ((0, _getType.isType)(res, "promise") || res && res.then && res.catch) {
      return res.then(res => res).catch(e => {
        if (retryTimes <= 1) {
          return Promise.reject(e);
        }
        onerror && onerror(e);
        return retry(fn, retryTimes - 1, _this, onerror)(...args);
      });
    }
    return Promise.resolve(res);
  };
}