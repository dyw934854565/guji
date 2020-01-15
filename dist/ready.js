"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitReady = emitReady;
exports.onReady = onReady;
exports.isReady = isReady;

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _getDefer = require("./getDefer");

var _getDefer2 = _interopRequireDefault(_getDefer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statusMap = {};
const dataMap = {};
const events = new _events2.default();
function emitReady(eventName, data) {
  statusMap[eventName] = true;
  dataMap[eventName] = data;
  events.emit(eventName, data);
}

function onReady(eventName, fn) {
  const defer = (0, _getDefer2.default)();
  if (statusMap[eventName]) {
    const data = dataMap[eventName];
    defer.resolve(data);
    fn && fn(data);
  } else {
    events.once(eventName, data => {
      defer.resolve(data);
      fn && fn(data);
    });
  }
  return defer.promise;
}

function isReady(eventName) {
  return statusMap[eventName];
}