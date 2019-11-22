'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logTime;

var _getType = require('./getType');

function logTime(fn, text, _this, callback = console.log.bind(console)) {
  const label = text || fn.name || 'time';
  return function (...args) {
    const startT = Date.now();
    const res = fn.apply(_this || this, args);
    if ((0, _getType.isType)(res, 'promise') || res && res.then && res.catch) {
      res.catch().then(() => {
        const consume = Date.now() - startT;
        callback && callback(label, consume);
      });
    } else {
      const consume = Date.now() - startT;
      callback && callback(label, consume);
    }
    return res;
  };
}