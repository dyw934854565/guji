export interface Defer {
  promise: Promise<any>,
  reject: (result: any) => void,
  resolve: (error: any) => void
}

declare function getDefer(msReject?: number): Defer

export default getDefer
