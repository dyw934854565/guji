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
  if (isType(fn, 'promise') || (fn.then && fn.catch)) {
    const defer = getDefer(ms)
    return Promise.race([fn, defer.promise])
  }
  throw new Error('第一个参数应该是函数或者Promise')
}
