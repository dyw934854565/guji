import getDefer from './getDefer'

test("getDefer resolve", (done) => {
  const defer = getDefer();
  defer.resolve(123);
  defer.promise.then(data => {
    expect(data).toBe(123);
    done()
  })
});

test("getDefer reject", done => {
  const defer = getDefer();
  defer.reject(123);
  defer.promise.then(() => {}, data => {
    expect(data).toBe(123);
    done();
  });
});

test("getDefer timeout", done => {
  const defer = getDefer(1000);
  defer.promise.then(() => { }, err => {
    expect(err.message).toBe('timeout');
    done();
  });
});
