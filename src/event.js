import { isType } from './getType'
import firstUppercase from "./firstUppercase";
export default function createEvent() {
  let cbs = []
  return {
    on (cb) {
      if (!isType(cb, 'function')) {
        throw new Error('回调应该是函数')
      }
      const index = cbs.indexOf(cb)
      if (index < 0) {
        cbs.push(cb)
      }
      return cb
    },
    once (cb) {
      if (!isType(cb, 'function')) {
        throw new Error('回调应该是函数')
      }
      const onceWrap = (...args) => {
        this.off(onceWrap)
        cb(...args)
      }
      return this.on(onceWrap)
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
      // 复制一下，防止调用的时候cbs的length变化，导致部分执行不到
      [...cbs].forEach(cb => cb(...args))
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
  const evt = createEvent()
  const newFn = function(...args) {
    oldFn && oldFn(...args)
    evt.emit(...args)
  }
  target[key] = newFn
  target[`on${targetKey}`] = evt.on.bind(evt)
  target[`off${targetKey}`] = evt.off.bind(evt)
  target[`get${targetKey}Handlers`] = evt.getHandlers.bind(evt)
}
