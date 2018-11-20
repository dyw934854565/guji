import { isType } from './getType'
export default function cache (fn, _thisArg, resetReject = true) {
  let res
  let isCached = false
  return function (...args) {
    if (isCached === true) {
      return res
    }
    res = fn.apply(this || _thisArg || {}, args)
    isCached = true
    if (resetReject && typeof res === 'object' && isType(res, 'promise')) {
      res.catch(e => {
        res = undefined
        isCached = false
      })
    }
    return res
  }
}
