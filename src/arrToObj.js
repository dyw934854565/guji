export default function arrToObj (arr = [], fn) {
  const res = {}
  arr.forEach(item => {
    const [key, value] = fn.call(arr, item)
    res[key] = value
  })
  return res
}
