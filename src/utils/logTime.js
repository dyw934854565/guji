import { isType } from './getType'
export default function logTime (fn, text, _this, callback) {
  const label = text || fn.name || 'call time:'
  return function (...args) {
    const startT = Date.now()
    const res = fn.apply(_this || this || {}, args)
    if (isType(res, 'promise') || (res.then && res.catch)) {
      // polyfill返回的不是标准的promise
      res.catch().then(() => {
        const consume = Date.now() - startT
        console.log(label, consume)
        callback && callback(consume)
      })
    } else {
      const consume = Date.now() - startT
      console.log(label, consume)
      callback && callback(consume)
    }
    return res
  }
}
