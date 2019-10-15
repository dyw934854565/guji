import arrToObj from './arrToObj';

test('arrToObj', () => {
  const obj = arrToObj(['a', 'b'], (key) => [key, 1]);
  expect(obj).toHaveProperty('a', 1);
  expect(obj).toHaveProperty('b', 1);
  expect(arrToObj(undefined, key => [key, 1])).toEqual({});
})
