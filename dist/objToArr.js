"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = objToArr;
function objToArr(obj = {}, fn = a => a[1]) {
  return Object.entries(obj).map(fn);
}