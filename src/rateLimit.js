export function getNext (tasks) {
  if (Array.isArray(tasks)) {
    return tasks.shift()
  }
  if (typeof tasks === 'function') {
    return tasks()
  }
  // Iterator
  if (typeof tasks.next === 'function') {
    const res = tasks.next()
    if (res.done) return undefined
    return res.value
  }
  return undefined
}
export default function rateLimit(tasks, rate, fn) {
  let doneCount = 0
  return new Promise((resolve, reject) => {
    const errs = [];
    const errTasks = [];
    const successTasks = [];
    const doRequest = () => {
      try {
        const item = getNext(tasks)
        if (typeof item === 'undefined') {
            doneCount++
            if (doneCount === rate) {
              if (!errs.length) {
                resolve()
              } else {
                reject({errs, errTasks, successTasks})
              }
            }
            return
        }
        const res = fn ? fn(item) : item()
        res.then(() => {
          successTasks.push(item)
        }).catch((err) => {
          errs.push(err)
          errTasks.push(item);
        }).then(doRequest)
      } catch (err) {
        reject(err)
      }
    }
    Array.from({length: rate}).forEach(doRequest)
  })
}
