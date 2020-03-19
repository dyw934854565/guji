export type Tasks = Array<any> | Function
declare function rateLimit(tasks: Tasks, rate: number, fn: Function): Promise<undefined>

export declare function getNext(tasks: Tasks): any
export default rateLimit;
