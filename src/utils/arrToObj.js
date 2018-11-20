export default function arrToObj (arr = [], fn) {
  const res = {}
  arr.map(item => {
    const [key, value] = fn.call(arr, item)
    res[key] = value
  })
  return res
}
