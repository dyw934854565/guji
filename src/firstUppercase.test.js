import firstUppercase from "./firstUppercase";

test("normal", () => {
  expect(firstUppercase('abcd')).toBe('Abcd');
  expect(firstUppercase('aBcd')).toBe('ABcd');
  expect(firstUppercase('Dbac')).toBe('Dbac');
  expect(firstUppercase('zbc')).toBe('Zbc');
  expect(firstUppercase('ZZZ')).toBe('ZZZ');
  expect(firstUppercase('中123')).toBe('中123');
});

test("not string", () => {
  expect(firstUppercase()).toBeUndefined();
  expect(firstUppercase('')).toBe('');
  expect(firstUppercase(null)).toBeNull;
  expect(firstUppercase(NaN)).toBeNaN();
  expect(firstUppercase({})).toMatchObject({});
});
