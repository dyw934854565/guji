import getDefer from './getDefer'
import {isType} from './getType'
export default function timeout(fn, ms = 100, _this) {
  if (isType(fn, 'function')) {
    return function (...args) {
      const defer = getDefer(ms)
      const res = fn.apply(_this || this, args)
      if (isType(res, "promise") || (res && res.then && res.catch)) {
        return Promise.race([res, defer.promise]);
      }
      return res
    }
  }
  // fn is promise
  if (isType(fn, 'promise') || (fn && fn.then && fn.catch)) {
    const defer = getDefer(ms)
    return Promise.race([fn, defer.promise])
  }
  throw new Error('第一个参数应该是函数或者Promise')
}
