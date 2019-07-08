import getDefer from './getDefer'
import {isType} from './getType'
export default function timeout(fn, ms = 100, _this) {
  if (isType(fn, 'function')) {
    return function (...args) {
      const defer = getDefer(ms)
      return Promise.race([fn.apply(_this || this, args), defer.promise])
    }
  }
  // fn is promise
  const defer = getDefer(ms)
  return Promise.race([fn, defer.promise])
}
