export default function logTime(fn, text, _this, callback = console.log.bind(console)) {
  const label = text || (fn.name || '') + 'result:'
  return function (...args) {
    const res = fn.apply(_this || this, args)
    callback(label, res);
    return res
  }
}
