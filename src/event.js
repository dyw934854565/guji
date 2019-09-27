import { isType } from './getType'
export default function createEvent() {
  let cbs = []
  return {
    on (cb) {
      if (!isType(cb, 'function')) {
        return new Error('回调应该是函数')
      }
      const index = cbs.indexOf(cb)
      if (index > -1) {
        return
      }
      cbs.push(cb)
    },
    off (cb) {
      if (!cb) {
        cbs = []
        return
      }
      const index = cbs.indexOf(cb)
      if (index > -1) {
        cbs.splice(index, 1)
      }
    },
    emit (...args) {
      cbs.forEach(cb => cb(...args))
    },
    getHandlers () {
      return cbs
    }
  }
}
