'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeObj;

var _getType = require('./getType');

var _safeFun = require('./safeFun');

var _safeFun2 = _interopRequireDefault(_safeFun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function safeObj(obj = {}, handle) {
  Object.keys(obj).forEach(key => {
    if ((0, _getType.isType)(obj[key], 'function')) {
      obj[key] = (0, _safeFun2.default)(obj[key], undefined, handle);
    }
  });
  return obj;
}