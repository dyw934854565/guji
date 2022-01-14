export interface Defer<T> {
  promise: Promise<T>,
  reject: (error?: any) => void,
  resolve: (result: T) => void,
}

declare function getDefer<T>(msReject?: number): Defer<T>

export default getDefer
