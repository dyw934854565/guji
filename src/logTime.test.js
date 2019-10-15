import logTime from './logTime'
import sleep from './sleep'

test("log", () => {
  const fn = jest.fn();
  const add = logTime(n => n, "n", null, fn);
  add(1);
  expect(fn).toBeCalled();
});

test('log time', async () => {
  const sleep_1000 = logTime(sleep, "", null, (label, time) => {
    expect(label).toBe("sleep");
    expect(time).toBeCloseTo(1000, -1.4);
  });
  const sleep_200 = logTime(sleep, "", null, (label, time) => {
    expect(label).toBe("sleep");
    expect(time).toBeCloseTo(200, -1.4);
  });
  await sleep_1000(1000);
  await sleep_200(200);
})
