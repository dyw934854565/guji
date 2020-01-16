export default function objToArr (obj = {}, fn = a => a[1]) {
  return Object.entries(obj).map(fn)
}
