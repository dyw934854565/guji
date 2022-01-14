declare function arrToObj<T, K>(arr: T[], fn: (value: T, index?: number, array?: T[]) => [string, K]): Record<string, K>
export default arrToObj
