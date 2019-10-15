import timeout from './timeout'
import sleep from './sleep'

test('timeout resolve', () => {
  const limit200Sleep = timeout(sleep, 200)
  let res = 0
  limit200Sleep(1000).then(() => res = 1, () => res = 0).then(() => {
    expect(res).toBe(0);
  });
  limit200Sleep(100).then(() => res = 1, () => res = 0).then(() => {
    expect(res).toBe(1);
  });
})

test('timeout reject', () => {
  const msToReject = (msReject = 1000, data) => {
    return new Promise((resolve, reject) => {
      msReject &&
        setTimeout(() => {
          reject(data)
        }, msReject)
    })
  }
  const limit200Reject = timeout(msToReject, 200, {})
  limit200Reject(400, 123).then(() => 1, res => expect(res).not(123));
  limit200Reject(100, 123).then(() => 1, res =>
    expect(res).toBe(123)
  )
})

test('args check', () => {
  const fun = () => timeout(123)
  expect(fun).toThrow()
})

test('promise timeout', () => {
  const limit300Sleep = timeout(sleep(200), 300)
  const limit100Sleep = timeout(sleep(200), 100)
  let res = 0
  limit300Sleep.then(() => res = 1, () => res = 0).then(() => {
    expect(res).toBe(1);
  });
  limit100Sleep.then(() => res = 1, () => res = 0).then(() => {
    expect(res).toBe(0);
  });
})

test("promise fn => not promise", () => {
  const limit300Sleep = timeout(() => 123, 300);
  const limit100Sleep = timeout(() => 456, 100);
  expect(limit100Sleep()).toBe(456);
  expect(limit300Sleep()).toBe(123);
});
