"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sleep;
function sleep(ms = 1000, PromiseValue) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(PromiseValue);
    }, ms);
  });
}