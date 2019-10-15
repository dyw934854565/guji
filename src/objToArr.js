export default function objToArr (obj = {}, fn = a => a) {
  return Object.entries(obj).map(fn)
}
