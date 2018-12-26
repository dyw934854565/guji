import cache from './cache'
import sleep from './sleep'
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
  let count = 0;
  function pow (a, b) {
    count += 1;
    return Math.pow(a, b)
  }
  const powSum = cache(pow, null, true, (a, b) => "" + a + "-" + b);
  expect(powSum(34, 2)).toBe(1156);
  expect(count).toBe(1);
  expect(powSum(34, 2)).toBe(1156);
  expect(count).toBe(1);

  expect(powSum(34, 8)).toBe(1785793904896);
  expect(count).toBe(2);
  expect(powSum(34, 8)).toBe(1785793904896);
  expect(count).toBe(2);
});

test("cache resolve", () => {
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
  const rejectCache = cache(reject(count), null, false);
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

test("cache with params", () => {
  const count = {};
  const resolveCache = cache(resolve(count), null, true, _ => _);
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

test("cache resolve call bath", () => {
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
