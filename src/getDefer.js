export default function getDefer (msReject = 0) {
  const res = {}
  res.promise = new Promise((resolve, reject) => {
    res.reject = reject
    res.resolve = resolve
    msReject &&
      setTimeout(() => {
        reject(new Error('timeout'))
      }, msReject)
  })
  return res
}
