import { isType } from './getType'
export default function retry(fn, retryTimes = 2, _this, onerror = console.log.bind(console)) {
  return function (...args) {
    let res;
    try {
      res = fn.apply(_this || this, args);
    } catch (e) {
      if (retryTimes <= 1) {
        return Promise.reject(e)
      }
      onerror && onerror(e)
      return retry(fn, retryTimes - 1, _this, onerror)(...args);
    }
    if (isType(res, "promise") || (res && res.then && res.catch)) {
      return res.then(res => res).catch(e => {
        if (retryTimes <= 1) {
          return Promise.reject(e);
        }
        onerror && onerror(e)
        return retry(fn, retryTimes - 1, _this, onerror)(...args);
      });
    }
    return Promise.resolve(res)
  }
}
