declare function safeObj<T extends Record<any, any>>(obj: T, handle?: Function): T
export default safeObj
