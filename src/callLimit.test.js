import callLimit from './callLimit'

test("callLimit", () => {
  let i = 1
  const a = callLimit(() => {
    i++
  })
  a()
  a()
  expect(i).toBe(2);
});

