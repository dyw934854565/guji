import { isType } from './getType'
export default function retry(fn, retryTimes = 2, _this) {
  return function (...args) {
    let res;
    try {
      res = fn.apply(_this || this, args);
    } catch (e) {
      if (retryTimes <= 1) {
        return Promise.reject(e)
      }
      return retry(fn, retryTimes - 1, _this)(...args);
    }
    if (isType(res, "promise") || (res && res.then && res.catch)) {
      return res.then(res => res).catch(e => {
        if (retryTimes <= 1) {
          return Promise.reject(e);
        }
        return retry(fn, retryTimes - 1, _this)(...args);
      });
    }
    return Promise.resolve(res)
  }
}
