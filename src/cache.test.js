import cache from './cache'
import sleep from './sleep'
import {preventCache} from './cache'
const resolve = function (count = {}) {
  count.count = count.count || 0;
  return function (data) {
    count.count += 1;
    return sleep(1000, data);
  }
}
const reject = function (count = {}) {
  count.count = count.count || 0;
  return function(data) {
    count.count += 1;
    return Promise.reject(data);
  };
};

test("cache", () => {
  const pow = jest.fn(function pow (a, b) {
    return Math.pow(a, b)
  });
  const powSum = cache(pow, null, {keyFn: (a, b) => "" + a + "-" + b});
  expect(powSum(34, 2)).toBe(1156);
  expect(pow).toBeCalledTimes(1);
  expect(powSum(34, 2)).toBe(1156);
  expect(pow).toBeCalledTimes(1);

  expect(powSum(34, 8)).toBe(1785793904896);
  expect(pow).toBeCalledTimes(2);
  expect(powSum(34, 8)).toBe(1785793904896);
  expect(pow).toBeCalledTimes(2);
});

test("cache resolve no keyFn", () => {
  const count = {}
  const resolveCache = cache(resolve(count));
  return resolveCache(34)
    .then(data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    })
    .then(resolveCache.bind(null, 22))
    .then(data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    });
});

test("cache reject auto reset reject", () => {
  const count = {}
  const rejectCache = cache(reject(count));
  return rejectCache(34)
    .then(() => {}, data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    })
    .then(() => rejectCache(22))
    .then(() => { }, data => {
      expect(count.count).toBe(2);
      expect(data).toBe(22);
    });
});

test("cache reject not reset reject", () => {
  const count = {}
  const rejectCache = cache(reject(count), null, {resetReject: false});
  return rejectCache(34)
    .then(() => { }, data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    })
    .then(() => rejectCache(22))
    .then(() => {}, data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    });
});

test("cache with params with keyFn", () => {
  const count = {};
  const resolveCache = cache(resolve(count), null, {keyFn: _ => _});
  return resolveCache(34)
    .then(data => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    })
    .then(resolveCache.bind(null, 22))
    .then(data => {
      expect(count.count).toBe(2);
      expect(data).toBe(22);
    })
    .then(resolveCache.bind(null, 34))
    .then(data => {
      expect(count.count).toBe(2);
      expect(data).toBe(34);
    });
});

test("cache resolve call both", () => {
  const count = {};
  const resolveCache = cache(resolve(count));
  return Promise.all([resolveCache(34), resolveCache(34)])
    .then(([data, data2]) => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
      expect(data2).toBe(34);
    });
});

test('thenable cache', () => {
  let callCount = 0;
  const get = cache(function (d) {
    callCount += 1;
    return {
      then: function (resolve, reject) {
        return Promise.resolve(resolve(d));
      },
      catch: function () {

      }
    };
  })
  return get(2)
    .then(data => {
      expect(callCount).toBe(1);
      expect(data).toBe(2);
    })
    .then(() => get(3))
    .then(data => {
      expect(callCount).toBe(1);
      expect(data).toBe(2);
    });
});

test('msMaxAge', () => {
  const count = {};
  const resolveCache = cache(resolve(count), null, {msMaxAge: 1500});
  return Promise.all([
    resolveCache(34).then((data) => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    }),
    resolveCache(22).then((data) => {
      expect(count.count).toBe(1);
      expect(data).toBe(34);
    }),
    sleep(2000).then(_ => resolveCache(22)).then((data) => {
      expect(count.count).toBe(2);
      expect(data).toBe(22);
    })
  ])
    
})

test("cache prevent", () => {
  const count = {}
  const resolveCache = cache(resolve(count), null, {resetReject: false, keyFn: (number) => {
    if (number === 22) {
      return preventCache;
    }
    return number;
  }});
  return resolveCache(22)
    .then(data => {
      expect(count.count).toBe(1);
      expect(data).toBe(22);
    })
    .then(() => resolveCache(22))
    .then(data => {
      expect(count.count).toBe(2);
      expect(data).toBe(22);
    })
    .then(() => resolveCache(23))
    .then(data => {
      expect(count.count).toBe(3);
      expect(data).toBe(23);
    })
    .then(() => resolveCache(23))
    .then(data => {
      expect(count.count).toBe(3);
      expect(data).toBe(23);
    });
});