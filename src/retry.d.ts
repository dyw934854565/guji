declare function retry<T extends Function>(fn: T, retryTimes?: number, _this?: any, onerror?: (err: Error) => void): T
export default retry
