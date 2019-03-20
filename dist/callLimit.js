'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callLimit;
function callLimit(fn, limit = 1, _this, callback = console.log) {
  let counter = 0;
  return function (...args) {
    if (counter <= limit) {
      return fn.apply(_this || this, args);
    }
    callback && callback(counter, 'extra call');
  };
}