"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
const getNow = () => {
  if (performance && performance.now) {
    return performance.now();
  }
  return Date.now();
};
function start(keys, str) {
  const now = getNow();
  keys[str] = now;
}
function end(keys, str, fn = console.log.bind(console)) {
  let t = 0;
  if (keys[str]) {
    t = getNow() - keys[str];
    delete keys[str];
  }
  fn && fn(str, t);
}

function create() {
  const keys = {};
  return {
    start: start.bind(null, keys),
    end: end.bind(null, keys)
  };
}

exports.default = create();