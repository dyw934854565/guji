import {beforeSlice, afterSlice} from './funSlice';

test("normal", () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const before = jest.fn();
  const after = jest.fn();
  const no = jest.fn();
  const no1 = jest.fn();
  const target = {
    init: fn1,
    init2: fn2
  };
  beforeSlice(target, "init", before);
  afterSlice(target, "init2", after);
  afterSlice(target, "no", no);
  beforeSlice(target, "no1", no1);
  target.init();
  target.init2();
  target.no();
  target.no1();
  expect(fn1).toBeCalled();
  expect(fn2).toBeCalled();
  expect(before).toBeCalled();
  expect(after).toBeCalled();
  expect(no).toBeCalled();
  expect(no1).toBeCalled();
});

test("before", () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const fn3 = jest.fn();
  const abc = jest.fn();
  const abcd = jest.fn();
  const target = {
    abc,
    init: fn1,
    beforeInit: fn2,
    afterInit: fn3
  };
  beforeSlice(target, 'init');
  afterSlice(target, 'init', abcd);
  target.init();
  expect(fn1).toBeCalled();
  expect(fn2).toBeCalled();
  expect(fn3).not.toBeCalled();
  expect(abc).not.toBeCalled();
  expect(abcd).toBeCalled();
});
