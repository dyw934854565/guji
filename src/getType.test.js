import { getType, isType } from './getType'

const obj = {
  'Object': {},
  'Array': [],
  'Undefined': undefined,
  'Null': null
};
test("getType", () => {
  Object.entries(obj).forEach(([key, value]) => {
    expect(getType(value)).toBe(key);
  });
});

test("isType", () => {
  Object.entries(obj).forEach(([key, value]) => {
    expect(isType(value, key)).toBeTruthy();
    expect(isType(value, key.toLowerCase())).toBeTruthy();
  });

  expect(isType([], {})).toBeFalsy();
  expect(isType()).toBeFalsy();
});
