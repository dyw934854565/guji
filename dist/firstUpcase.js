'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = firstUpcase;
function firstUpcase(str) {
  if (typeof str !== 'string') return str;
  if (!str) return str;
  return str.replace(/^([a-z])/, $0 => $0.toUpperCase());
}