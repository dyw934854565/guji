import timer from './timer'
import sleep from './sleep'

test('timer', async () => {
  let res
  console.log = (time, str) => {
    res = { str, time };
  };
  const timeEnd = timer();
  await sleep(1000);
  timeEnd("123", );
  expect(res.str).toBe('123');
  expect(res.time).toBeCloseTo(1000, -1.4);
})

test('time end', () => {
  const timeEnd = timer();
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  timeEnd('13', cb1);
  timeEnd('24', cb2);
  expect(cb1).toHaveBeenCalled();
  expect(cb2).not.toHaveBeenCalled();
})

test("time 2", () => {
  const timeEnd = timer();
  const timeEnd2 = timer();
  const cb1 = jest.fn();
  const cb2 = jest.fn();
  timeEnd("13", cb1);
  timeEnd2("24", cb2);
  expect(cb1).toHaveBeenCalled();
  expect(cb2).toHaveBeenCalled();
});
