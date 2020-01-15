import EventEmitter from "events"
import getDefer from './getDefer'
const statusMap = {}
const dataMap = {}
const events = new EventEmitter();
export function emitReady (eventName, data) {
  statusMap[eventName] = true
  dataMap[eventName] = data
  events.emit(eventName, data)
}

export function onReady(eventName, fn) {
  const defer = getDefer()
  if (statusMap[eventName]) {
    const data = dataMap[eventName]
    defer.resolve(data)
    fn && fn(data)
  } else {
    events.once(eventName, data => {
      defer.resolve(data)
      fn && fn(data)
    })
  }
  return defer.promise
}

export function isReady(eventName) {
  return statusMap[eventName]
}
