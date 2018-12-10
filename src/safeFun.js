import {isType} from './getType'
export default function safeFun(fn, _thisArg, handle = console.log.bind(console, 'safefun error:')) {
  return function () {
    const args = [].slice.call(arguments, 0)
    try {
      const res = fn.apply(_thisArg || this, args)
      if (isType(res, "promise") || (res && res.then && res.catch)) {
        res.catch(handle.bind(_thisArg || this));
      }
      return res
    } catch (e) {
      handle.call(_thisArg || this, e);
    }
  }
}
