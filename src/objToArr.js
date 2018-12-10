export default function objToArr (obj = {}, fn) {
  return Object.entries(obj).map(fn)
}
