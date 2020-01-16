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

test('objToArr default, same as Object.values', () => {
  const res = objToArr(
    {
      a: "b",
      c: "d"
    }
  );
  expect(res.length).toBe(2);
  expect(res[0]).toBe("b");
  expect(res[1]).toBe("d");

})
