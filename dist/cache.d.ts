export type CacheOptions<T extends (...args: any) => any> = {
    resetReject?: boolean,
    keyFn?: (...args: Parameters<T>) => string,
    msMaxAge?: number
}
declare function cache<T extends (...args: any) => any>(fn: T, _thisArg?: any, cacheOptions?: CacheOptions<T>): T

export default cache
