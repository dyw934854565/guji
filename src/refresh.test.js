import refresh from './refresh'
import sleep from './sleep'

function timeout (ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, ms, new Error('timeout'));
  })
}

function resolve(ms = 0, value) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, value);
  })
}
async function allSettled(args) {
  for (var i of args) {
    await i
  }
}
const newSleep = refresh(sleep)
const newResolve = refresh(resolve)
const newTimeout = refresh(timeout)
test("refresh", async () => {
  await allSettled([
    expect(newSleep(100)).rejects.toThrow('data has expired'),
    expect(newSleep(200)).resolves.toBeUndefined()
  ])
  await allSettled([
    expect(newTimeout(100)).rejects.toThrow('data has expired'),
    expect(newTimeout(200)).rejects.toThrow('timeout')
  ])
  await allSettled([
    expect(newResolve(100, 789)).rejects.toThrow('data has expired'),
    expect(newResolve(100, 456)).resolves.toBe(456)
  ])
});

test("not refresh", async () => {
  await expect(newSleep(1000)).resolves.toBeUndefined()
  await expect(newSleep(500)).resolves.toBeUndefined()
  await expect(newTimeout(1000)).rejects.toThrow('timeout')
  await expect(newResolve(1000, 123)).resolves.toBe(123)
  await expect(newResolve(1000, 456)).resolves.toBe(456)
});

test("refresh many times", async () => {
  await allSettled([
    expect(newSleep(1000)).rejects.toThrow('data has expired'),
    expect(newSleep(1000)).rejects.toThrow('data has expired'),
    expect(newSleep(1000)).rejects.toThrow('data has expired'),
    expect(newSleep(1000)).resolves.toBeUndefined()
  ])
  await allSettled([
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('timeout')
  ])
});

test("refresh thenable", async () => {
  const newTimeout = refresh(function timeout(ms = 0) {
    return {
      then(resolve, reject) {
        setTimeout(reject, ms, new Error('timeout'));
      }
    }
  })
  await allSettled([
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('data has expired'),
    expect(newTimeout(1000)).rejects.toThrow('timeout')
  ])
});
