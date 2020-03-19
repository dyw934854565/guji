export type CacheOptions = {
    resetReject?: boolean,
    keyFn?: (...args: any[]) => string,
    msMaxAge?: number
}
declare function cache(fn: Function, _thisArg?: any, cacheOptions?: CacheOptions): Function

export default cache
