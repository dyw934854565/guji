import retry from './retry';

function timesToResolve(times) {
  var time = 1;
  var callTimes = 0
  return function get() {
    callTimes += 1
    if (time === times) {
      return Promise.resolve(callTimes);
    }
    time += 1;
    return Promise.reject(callTimes);
  }
}
test("reject once retry once expect resolve", () => {
  const get = timesToResolve(2);
  return retry(get)().then(data => {
    expect(data).toBe(2);
  });
});

test('reject twice expect reject', () => {
  const get = timesToResolve(3);
  return retry(get)().then(data => {
  }, (data) => {
    expect(data).toBe(2);
  });
});

test('resolve expect resolve', () => {
  const get = timesToResolve(1);
  return retry(get)().then(data => {
    expect(data).toBe(1);
  }, (data) => {
  });
});

test('reject no retry expect reject', () => {
  const get = timesToResolve(2);
  return retry(get, 1)().then(data => {

  }, (data) => {
    expect(data).toBe(1);
  });
});

test('error no retry expect reject', () => {
  let retryCount = 0;
  const get = function () {
    retryCount += 1;
    throw new Error(0)
  }
  return retry(get, 1)().then(data => {

  }, (data) => {
    expect(retryCount).toBe(1);
    expect(data.message).toBe('0');
  });
});

test('error retry expect reject', () => {
  let retryCount = 0
  const get = function () {
    retryCount += 1;
    throw new Error(0)
  }
  return retry(get)().then(data => {

  }, (data) => {
    expect(retryCount).toBe(2);
    expect(data.message).toBe('0');
  });
});

test('error retry expect resolve', () => {
  let retryCount = 0
  const get = function () {
    retryCount += 1;
    if (retryCount == 2) {
      return 3;
    }
    throw new Error(0)
  }
  return retry(get)().then(data => {
    expect(retryCount).toBe(2);
    expect(data).toBe(3);
  }, (data) => {
  });
});

test('no error no retry expect resolve', () => {
  let retryCount = 0;
  const get = function (d) {
    retryCount += 1;
    return d
  }
  return retry(get)(2).then(data => {
    expect(retryCount).toBe(1);
    expect(data).toBe(2);
  }, (data) => {
  });
});

test('thenable expect resolve', () => {
  let retryCount = 0;
  const get = function (d) {
    retryCount += 1;
    return {
      then: function (resolve, reject) {
        return Promise.resolve(resolve(d));
      },
      catch: function () {

      }
    };
  }
  return retry(get)(2).then(data => {
    expect(retryCount).toBe(1);
    expect(data).toBe(2);
  }, (data) => {
  });
});
