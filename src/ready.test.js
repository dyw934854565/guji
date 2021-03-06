import {emitReady, onReady, isReady} from './ready'

test("ready", (done) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      expect(isReady("test")).toBeFalsy();
      emitReady("test", 123);
      expect(isReady("test")).toBeTruthy();
    }, 1000);
    resolve();
  }).then(() => {
    return onReady('test', (data) => {
      expect(data).toBe(123);
    }).then(data => {
      expect(data).toBe(123);
    })
  }).then(() => {
    return onReady("test", data => {
      expect(data).toBe(123);
    }).then(data => {
      expect(data).toBe(123);
      done();
    });
  });
});

test('callback once', () => {
  const cb = jest.fn();
  onReady('test', cb);
  emitReady('test', 123);
  emitReady('test', 456);
  expect(cb).toHaveBeenCalledTimes(1);
})
