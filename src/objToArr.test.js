import objToArr from './objToArr'

test('objToArr', () => {
  const fn = jest.fn(([key, val]) => ({key, val}));
  const res = objToArr(
    {
      a: "b",
      c: "d"
    },
    fn
  );
  expect(res.length).toBe(2);
  expect(objToArr(undefined, fn).length).toBe(0);
})
