'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterSlice = exports.beforeSlice = undefined;

var _getType = require('./getType');

var _firstUppercase = require('./firstUppercase');

var _firstUppercase2 = _interopRequireDefault(_firstUppercase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fnSlice(isBefore, target, key, fn) {
  let fn_ = fn;
  if (!fn_) {
    const firstUppercaseKey = (0, _firstUppercase2.default)(key);
    const fullKey = (isBefore ? 'before' : 'after') + firstUppercaseKey;
    fn_ = target[fullKey];
    if (!fn_) return;
  }
  if (!(0, _getType.isType)(fn_, 'function')) return;
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
      fn_.apply(this, args);
    };
  }
}

const beforeSlice = exports.beforeSlice = fnSlice.bind(null, true);
const afterSlice = exports.afterSlice = fnSlice.bind(null, false);