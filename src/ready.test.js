import {emitReady, onReady} from './ready'

test("ready", (done) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      emitReady("test", 123);
    }, 1000);
    resolve();
  }).then(() => {
    return onReady('test', (data) => {
      expect(data).toBe(123);
      done();
    }).then(data => {
      expect(data).toBe(123);
    })
  });
});
