'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.isType = isType;
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}
function isType(val, type) {
  if (typeof type !== 'string') {
    return false;
  }
  return getType(val).toLowerCase() === type.toLowerCase();
}