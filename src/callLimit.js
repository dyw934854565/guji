export default function callLimit(fn, limit = 1, _this, callback = console.log) {
  let counter = 1
  return function (...args) {
    if (counter <= limit) {
      counter++
      return fn.apply(_this || this, args);
    }
    callback && callback(counter, 'extra call');
  }
}
