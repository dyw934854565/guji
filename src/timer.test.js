import timer, { create } from './timer'
import sleep from './sleep'

test('timer', async () => {
  let res
  const _log = console.log
  console.log = (str, time) => {
    res = {str, time}
  }
  timer.start('123')
  await sleep(1000)
  timer.end('123')
  expect(res.str).toBe('123')
  expect(Boolean(Math.abs(res.time - 1000) < 10)).toBe(true)


  timer.end('123', (str, time) => {
    expect(str).toBe('123')
    expect(time).toBe(0)
  })
})

test('create', async () => {
  const tm1 = create()
  const tm2 = create()
  tm1.start('345')
  await sleep(1000)
  tm2.end('345', (str, time) => {
    expect(str).toBe('345')
    expect(time).toBe(0)
  })
  tm1.end('345', (str, time) => {
    expect(str).toBe('345')
    expect(Boolean(Math.abs(time - 1000) < 10)).toBe(true)
  })
})
