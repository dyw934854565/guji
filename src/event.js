import { isType } from './getType'
import firstUppercase from "./firstUppercase";
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

export function makeEvent(target, key, targetKey) {
  if (!target || !key || !targetKey) throw new Error('miss makeEvent params')
  if (target[`on${targetKey}`] && target[`off${targetKey}`]) return // has makeEvent
  targetKey = firstUppercase(targetKey)
  const oldFn = target[key]
  const newFn = function(...args) {
    oldFn && oldFn(...args)
    evt.emit(...args)
  }
  const evt = createEvent()
  target[key] = newFn
  target[`on${targetKey}`] = evt.on
  target[`off${targetKey}`] = evt.off
  target[`get${targetKey}Handlers`] = evt.getHandlers
}
