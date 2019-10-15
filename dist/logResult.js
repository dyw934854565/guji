'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logResult;
function logResult(fn, text, _this, callback = console.log.bind(console)) {
  const label = text || fn.name || 'result';
  return function (...args) {
    const res = fn.apply(_this || this, args);
    callback && callback(label, res);
    return res;
  };
}