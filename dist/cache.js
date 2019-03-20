'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cache;

var _getType = require('./getType');

function cache(fn, _thisArg, resetReject = true, keyFn) {
  let res = {};
  let isCached = {};
  return function (...args) {
    const key = (0, _getType.isType)(keyFn, 'function') ? keyFn(...args) : keyFn;
    if (isCached[key] === true) {
      return res[key];
    }
    res[key] = fn.apply(_thisArg || this, args);
    isCached[key] = true;
    if (resetReject && ((0, _getType.isType)(res[key], 'promise') || res[key].then && res[key].catch)) {
      res[key].catch(e => {
        res[key] = undefined;
        isCached[key] = false;
      });
    }
    return res[key];
  };
}