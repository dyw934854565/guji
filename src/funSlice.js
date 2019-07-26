import firstUpcase from './firstUpcase'
function fnSlice (isBefore, target, key, fn) {
  let fn_ = fn
  if (!fn_) {
    const firstUpcaseKey = firstUpcase(key)
    const fullKey = (isBefore ? 'before' : 'after') + firstUpcaseKey;
    fn_ = target[fullKey];
    if (!fn_) return;
  }
  if (target[key]) {
    const _self = target[key];
    target[key] = function (...args) {
      if (isBefore) {
        fn_.apply(this, args);
      }
      _self.apply(this, args);
      if (!isBefore) {
        fn_.apply(this, args);
      }
    };
  } else {
    target[key] = function (...args) {
      if (isBefore) {
        fn_.apply(this, args);
      } else {
        fn_.apply(this, args);
      }
    };
  }
}

export const beforeSlice = fnSlice.bind(null, true)
export const afterSlice = fnSlice.bind(null, false)
