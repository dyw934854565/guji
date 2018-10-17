export function getType (val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}
export function isType (val, type) {
  if (typeof type !== 'string') {
    return false
  }
  return getType(val).toLowerCase() === type.toLowerCase()
}
