import getDefer from './getDefer'
export default function timeout(fn, ms = 100, _this) {
  return function(...args) {
    const defer = getDefer(ms)
    return Promise.race([fn.apply(_this || this, args), defer.promise])
  }
}
