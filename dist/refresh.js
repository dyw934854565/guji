'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refresh;

var _getType = require('./getType');

var _getDefer = require('./getDefer');

var _getDefer2 = _interopRequireDefault(_getDefer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function refresh(fn, _thisArg) {
  let lastRes = null;
  return function (...args) {
    const res = fn.apply(_thisArg || this, args);
    if (lastRes) {
      lastRes.reject(new Error('data has expired'));
    }
    if ((0, _getType.isType)(res, 'promise') || res && res.then && res.cache) {
      lastRes = (0, _getDefer2.default)();
      return Promise.race([res, lastRes.promise]);
    } else {
      lastRes = null;
      return res;
    }
  };
}