import logResult from './logResult'

test('logResult', () => {
  const fn = jest.fn()
  const add = logResult((a, b) => a + b, 'add', null, fn);
  add(1, 3);
  add(2, 6);
  expect(fn).toHaveBeenNthCalledWith(1, "add", 4);
  expect(fn).toHaveBeenNthCalledWith(2, 'add', 8);
})

test('logResult no label', () => {
  const fn = jest.fn()
  const add = logResult(function add (a, b) { return a + b }, '', null, fn);
  add(1, 3);
  add(2, 6);
  expect(fn).toHaveBeenNthCalledWith(1, "add", 4);
  expect(fn).toHaveBeenNthCalledWith(2, 'add', 8);
})

test('logResult no label no fun name', () => {
  const fn = jest.fn()
  const add = logResult((a, b) => a + b, '', null, fn);
  add(1, 3);
  add(2, 6);
  expect(fn).toHaveBeenNthCalledWith(1, "result", 4);
  expect(fn).toHaveBeenNthCalledWith(2, "result", 8);
})

test('logResult this', () => {
  const fn = jest.fn()
  const add = logResult(function () {return this.a}, 'a', {a: 'a'}, fn);
  add();
  expect(fn).toHaveBeenNthCalledWith(1, 'a', 'a');
})
