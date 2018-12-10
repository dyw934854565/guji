import {isType} from './getType'
import safeFun from './safeFun'
export default function safeObj (obj = {}, handle) {
  Object.keys(obj).forEach(key => {
    if (isType(obj[key], 'function')) {
      obj[key] = safeFun(obj[key], undefined, handle)
    }
  })
  return obj
}
