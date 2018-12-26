import sleep from './sleep'

test('sleep', () => {
  sleep().then((data) => {
    expect(data).toBeUndefined()
  });
  sleep(2000, 123).then(data => {
    expect(data).toBe(123);
  });
})
