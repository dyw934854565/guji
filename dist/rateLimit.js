'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNext = getNext;
exports.default = rateLimit;
function getNext(tasks) {
  if (Array.isArray(tasks)) {
    return tasks.shift();
  }
  if (typeof tasks === 'function') {
    return tasks();
  }
  // Iterator
  if (typeof tasks.next === 'function') {
    const res = tasks.next();
    if (res.done) return undefined;
    return res.value;
  }
  return undefined;
}
function rateLimit(tasks, rate, fn) {
  let doneCount = 0;
  return new Promise((resolve, reject) => {
    const errs = [];
    const doRequest = () => {
      try {
        const item = getNext(tasks);
        if (typeof item === 'undefined') {
          doneCount++;
          if (doneCount === rate) {
            if (!errs.length) {
              resolve();
            } else {
              reject(errs);
            }
          }
          return;
        }
        const res = fn ? fn(item) : item();
        res.catch(() => {
          errs.push(e);
        }).then(doRequest);
      } catch (e) {
        reject(e);
      }
    };
    Array.from({ length: rate }).forEach(doRequest);
  });
}