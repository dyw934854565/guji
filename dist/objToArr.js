"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = objToArr;
function objToArr(obj = {}, fn) {
  return Object.entries(obj).map(fn);
}