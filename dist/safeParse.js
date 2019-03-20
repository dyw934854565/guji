'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeParse;
function safeParse(str, defaultVal) {
  if (typeof str !== 'string') {
    return str;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return typeof defaultVal === 'undefined' ? str : defaultVal;
  }
}