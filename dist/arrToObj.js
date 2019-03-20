"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrToObj;
function arrToObj(arr = [], fn) {
  const res = {};
  arr.forEach((...args) => {
    const [key, value] = fn.apply(arr, args);
    res[key] = value;
  });
  return res;
}