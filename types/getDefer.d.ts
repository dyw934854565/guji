interface defer {
  promise: Promise<any>,
  reject: (result: any) => void,
  resolve: (error: any) => void
}

declare function getDefer(msReject: number): defer

export default getDefer
