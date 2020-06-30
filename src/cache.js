import { isType } from './getType'
export const preventCache = {}
export default function cache(fn, _thisArg, {resetReject = true, keyFn, msMaxAge = 0} = {}) {
  let res = {}
  let isCached = {}
  return function (...args) {
    const key = isType(keyFn, 'function') ? keyFn(...args) : keyFn
    if (key === preventCache) {
      return fn.apply(_thisArg || this, args)
    }
    if (isCached[key] && (msMaxAge <=0 || Date.now() - isCached[key] <= msMaxAge )) {
      return res[key]
    }
    res[key] = fn.apply(_thisArg || this, args)
    isCached[key] = Date.now()
    if (resetReject && (isType(res[key], 'promise') || (res[key] && res[key].then && res[key].catch))) {
      res[key].catch(e => {
        delete res[key]
        delete isCached[key]
      })
    }
    return res[key]
  }
}
