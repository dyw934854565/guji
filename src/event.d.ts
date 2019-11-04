declare function createEvent(): {
  on: (handle: Function) => void;
  off: (handle?: Function) => void;
  emit: (data: any) => void;
  getHandlers: () => Array<Function>
}
export default createEvent
