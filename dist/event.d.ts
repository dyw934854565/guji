declare function createEvent(): {
  on: (handle: Function) => Function;
  once: (handle: Function) => Function;
  off: (handle?: Function) => void;
  emit: (data: any) => void;
  getHandlers: () => Array<Function>
}

export declare function makeEvent(target: Object, key: String, targetKey: String): void
export default createEvent
