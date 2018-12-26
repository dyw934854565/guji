export default function sleep (ms = 1000, PromiseValue) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PromiseValue)
    }, ms)
  })
}
