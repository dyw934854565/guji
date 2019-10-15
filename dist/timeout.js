'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timeout;

var _getDefer = require('./getDefer');

var _getDefer2 = _interopRequireDefault(_getDefer);

var _getType = require('./getType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timeout(fn, ms = 100, _this) {
  if ((0, _getType.isType)(fn, 'function')) {
    return function (...args) {
      const defer = (0, _getDefer2.default)(ms);
      const res = fn.apply(_this || this, args);
      if ((0, _getType.isType)(res, "promise") || res.then && res.catch) {
        return Promise.race([res, defer.promise]);
      }
      return res;
    };
  }
  // fn is promise
  if ((0, _getType.isType)(fn, 'promise') || fn.then && fn.catch) {
    const defer = (0, _getDefer2.default)(ms);
    return Promise.race([fn, defer.promise]);
  }
  throw new Error('第一个参数应该是函数或者Promise');
}