'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeParse;
function safeParse(str, defaultVal, onerror = console.log) {
  if (typeof str !== 'string') {
    return str;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    onerror(e, str, 'json parse error');
    return typeof defaultVal === 'undefined' ? str : defaultVal;
  }
}