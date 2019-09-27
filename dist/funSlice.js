'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterSlice = exports.beforeSlice = undefined;

var _firstUpcase = require('./firstUpcase');

var _firstUpcase2 = _interopRequireDefault(_firstUpcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fnSlice(isBefore, target, key, fn) {
  let fn_ = fn;
  if (!fn_) {
    const firstUpcaseKey = (0, _firstUpcase2.default)(key);
    const fullKey = (isBefore ? 'before' : 'after') + firstUpcaseKey;
    fn_ = target[fullKey];
    if (!fn_) return;
  }
  if (target[key]) {
    const _self = target[key];
    target[key] = function (...args) {
      if (isBefore) {
        fn_.apply(this, args);
      }
      _self.apply(this, args);
      if (!isBefore) {
        fn_.apply(this, args);
      }
    };
  } else {
    target[key] = function (...args) {
      if (isBefore) {
        fn_.apply(this, args);
      } else {
        fn_.apply(this, args);
      }
    };
  }
}

const beforeSlice = exports.beforeSlice = fnSlice.bind(null, true);
const afterSlice = exports.afterSlice = fnSlice.bind(null, false);