interface Timer {
  start: (str: string) => void,
  end: (str: string, fun: (str: string, timer: number) => void) => void
}
export declare function create(): Timer
declare const timer: Timer;
export default timer
