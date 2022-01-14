declare function objToArr<T>(obj: object, fn: (value: any, index: number, array: any[]) => T): T[]
export default objToArr
