'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEvent;
exports.makeEvent = makeEvent;

var _getType = require('./getType');

var _firstUppercase = require('./firstUppercase');

var _firstUppercase2 = _interopRequireDefault(_firstUppercase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEvent() {
  let cbs = [];
  return {
    on(cb) {
      if (!(0, _getType.isType)(cb, 'function')) {
        return new Error('回调应该是函数');
      }
      const index = cbs.indexOf(cb);
      if (index > -1) {
        return;
      }
      cbs.push(cb);
    },
    off(cb) {
      if (!cb) {
        cbs = [];
        return;
      }
      const index = cbs.indexOf(cb);
      if (index > -1) {
        cbs.splice(index, 1);
      }
    },
    emit(...args) {
      cbs.forEach(cb => cb(...args));
    },
    getHandlers() {
      return cbs;
    }
  };
}

function makeEvent(target, key, targetKey) {
  if (!target || !key || !targetKey) throw new Error('miss makeEvent params');
  if (target[`on${targetKey}`] && target[`off${targetKey}`]) return; // has makeEvent
  targetKey = (0, _firstUppercase2.default)(targetKey);
  const oldFn = target[key];
  const newFn = function (...args) {
    oldFn && oldFn(...args);
    evt.emit(...args);
  };
  const evt = createEvent();
  target[key] = newFn;
  target[`on${targetKey}`] = evt.on;
  target[`off${targetKey}`] = evt.off;
  target[`get${targetKey}Handlers`] = evt.getHandlers;
}