interface timer {
  start: (str: string) => void,
  end: (str: string, fun: (str: string, timer: number) => void) => void
}
export declare function create (): timer

export default timer
