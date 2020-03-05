import { isType } from './getType'
import getDefer from './getDefer'
export default function refresh(fn, _thisArg) {
  let lastRes = null
  return function (...args) {
    const res = fn.apply(_thisArg || this, args)
    if (lastRes) {
      lastRes.reject(new Error('data has expired'))
    }
    if (isType(res, 'promise') || (res && res.then && res.catch)) {
      lastRes = getDefer()
      return Promise.race([res, lastRes.promise])
    } else {
      lastRes = null
      return res
    }
  }
}
