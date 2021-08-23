export type Tasks<T> = Array<T> | (() => () => Promise<any>) 
declare function rateLimit<T>(tasks: Array<T>, rate: number, fn: (item: T) => Promise<any>): Promise<undefined>
declare function rateLimit(tasks: (() => () => Promise<any>), rate: number): Promise<undefined>

export declare function getNext<T>(tasks: Tasks<T>): T | (() => Promise<any>)
export default rateLimit;
