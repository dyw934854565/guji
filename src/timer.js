function timer() {
  const start = Date.now();
  let hasCall = false
  return function timeEnd(label, fn = console.log.bind(console)) {
    if (hasCall) return
    const consumer = Date.now() - start;
    hasCall = true
    fn && fn(consumer, label)
  }
}

export default timer
