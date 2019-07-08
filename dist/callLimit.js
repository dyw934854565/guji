'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callLimit;
function callLimit(fn, limit = 1, _this, callback = console.log.bind(console)) {
  let counter = 0;
  return function (...args) {
    counter++;
    if (counter <= limit) {
      return fn.apply(_this || this, args);
    }
    callback && callback(counter, 'extra call');
  };
}