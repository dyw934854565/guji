export default function arrToObj (arr = [], fn) {
  const res = {}
  arr.forEach((...args) => {
    const [key, value] = fn.apply(arr, args)
    res[key] = value
  })
  return res
}
