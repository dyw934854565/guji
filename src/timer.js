const getNow = () => {
  if (performance && performance.now) {
    return performance.now()
  }
  return Date.now()
}
function start(keys, str) {
  const now = getNow()
  keys[str] = now
}
function end(keys, str, fn = console.log) {
  let t = 0
  if (keys[str]) {
    t = getNow() - keys[str]
    delete keys[str]
  }
  fn && fn(str, t)
}

export function create () {
  const keys = {}
  return {
    start: start.bind(null, keys),
    end: end.bind(null, keys)
  }
}

export default create()
