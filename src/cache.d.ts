declare function cache(fn: Function, _thisArg?: any, resetReject?: boolean, keyFn?: (...args: any[]) => string): Function

export default cache
