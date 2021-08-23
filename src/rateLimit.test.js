import rateLimit, {getNext} from './rateLimit'
import sleep from './sleep'

describe('getNext', () => {
  test('array', async () => {
    const arr = [1, 2, 3]
    expect(getNext(arr)).toBe(1)
    expect(getNext(arr)).toBe(2)
    expect(getNext(arr)).toBe(3)
    expect(getNext(arr)).toBeUndefined()
  })
  test('function', async () => {
    let i = 0
    const fn = () => {
      i++
      if (i < 3) {
        return i
      }
      return undefined
    }
    expect(getNext(fn)).toBe(1);
    expect(getNext(fn)).toBe(2);
    expect(getNext(fn)).toBeUndefined();
  })
  test('Iterator', async () => {
    const arr = [1, 2, 3];
    const iterator = arr[Symbol.iterator]()
    expect(getNext(iterator)).toBe(1);
    expect(getNext(iterator)).toBe(2);
    expect(getNext(iterator)).toBe(3);
    expect(getNext(iterator)).toBeUndefined();
  })
  test('other', async () => {
    const obj = {};
    expect(getNext(obj)).toBeUndefined();
  })
})

describe('rateLimit', () => {
  test('run all', async () => {
    const fn = jest.fn((ms) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    })
    const tasks = Array.from({length: 10}).map(() => () => fn(100))
    const res = await rateLimit(tasks, 4)
    expect(res).toBe(undefined)
    expect(fn).toBeCalledTimes(10)
  })
  test('run limit', async () => {
    const fn = jest.fn((ms) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    })
    const tasks = Array.from({length: 10}).map(() => () => fn(100))
    rateLimit(tasks, 4)
    await sleep(10)
    expect(fn).toBeCalledTimes(4)
    await sleep(140)
    expect(fn).toBeCalledTimes(8)
    await sleep(140);
    expect(fn).toBeCalledTimes(10)
  })
  test('run limit2', async () => {
    const fn = jest.fn((ms) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    })
    const tasks = Array.from({length: 10}).map((item, i) => () => fn(i * 100 + 100))
    const result = rateLimit(tasks, 4)
    await sleep(10)
    expect(fn).toBeCalledTimes(4)
    await sleep(100)
    expect(fn).toBeCalledTimes(5)
    await sleep(100)
    expect(fn).toBeCalledTimes(6)
    await sleep(200)
    expect(fn).toBeCalledTimes(8) // 前4个完成， 一共8次， 第5个已经开始300ms，还需要200ms完成
    await sleep(200)
    expect(fn).toBeCalledTimes(9)
    await sleep(200)
    expect(fn).toBeCalledTimes(10)
    await sleep(1000)
    expect(fn).toBeCalledTimes(10)
    expect(result).resolves.toBe(undefined)
  })

  test('item and fn not function reject', () => {
    const arr = [1, 2]
    expect(rateLimit(arr, 4)).rejects.toThrow();
  })

  test('fn', async () => {
    const fn = jest.fn((ms) => {
      return new Promise(resolve => setTimeout(resolve, ms))
    })
    const tasks = Array.from({length: 10}).map((val, index) => index)
    const res = await rateLimit(tasks, 4, fn)
    expect(res).toBe(undefined)
    expect(fn).toBeCalledTimes(10)
  })

  test('function reject', () => {
    const arr = [1, 2, 3, 4, 5, 6]
    expect(rateLimit(arr, 2, function(item) {
      return Promise.reject(new Error('ww'));
    })).rejects.toThrow();
  })
})
