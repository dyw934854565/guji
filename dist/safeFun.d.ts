declare function safeFun<T extends Function>(fn: T, _thisArg?: any, handle?: (err: Error) => void): T
export default safeFun
