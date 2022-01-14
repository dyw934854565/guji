declare function timeout<T extends Function>(fn: T, ms?: number, _this?: any): T
declare function timeout<K>(fn: Promise<K>, ms?: number, _this?: any): Promise<K>
export default timeout
