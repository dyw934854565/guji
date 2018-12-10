import { isType } from './getType'
export default function logTime(fn, text, _this, callback = console.log.bind(console)) {
  const label = text || fn.name || 'call time:'
  return function (...args) {
    const startT = Date.now()
    const res = fn.apply(_this || this, args)
    if (isType(res, 'promise') || (res.then && res.catch)) {
      res.catch().then(() => {
        const consume = Date.now() - startT
        callback && callback(label, consume)
      })
    } else {
      const consume = Date.now() - startT
      callback && callback(label, consume);
    }
    return res
  }
}
