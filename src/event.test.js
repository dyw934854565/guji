import createEvent, { makeEvent } from "./event";

test("on emit", () => {
  const event = createEvent()
  const cb1 = jest.fn()
  const cb2 = jest.fn()
  event.on(cb1)
  event.on(cb2)
  event.emit()
  expect(cb1).toHaveBeenCalled()
  expect(cb2).toHaveBeenCalled()
});

test("off one", () => {
  const event = createEvent()
  const cb1 = jest.fn()
  const cb2 = jest.fn()
  event.on(cb1)
  event.on(cb2)
  event.off(cb2)
  event.emit()
  expect(cb1).toHaveBeenCalled()
  expect(cb2).not.toHaveBeenCalled()
});

test("off all", () => {
  const event = createEvent()
  const cb1 = jest.fn()
  const cb2 = jest.fn()
  event.on(cb1)
  event.on(cb2)
  event.off()
  event.emit()
  expect(cb1).not.toHaveBeenCalled()
  expect(cb2).not.toHaveBeenCalled()
});

test("two event", () => {
  const event1 = createEvent()
  const event2 = createEvent()
  const cb1 = jest.fn()
  const cb2 = jest.fn()
  event1.on(cb1)
  event2.on(cb2)
  event1.emit()
  expect(cb1).toHaveBeenCalled()
  expect(cb2).not.toHaveBeenCalled()
});

test("emit data", () => {
  const event = createEvent()
  let i = 1
  event.on(d => {
    i = d
  })
  event.emit(2)
  expect(i).toBe(2)
});

test("getHandlers", () => {
  const event = createEvent()
  event.on(jest.fn())
  event.on(jest.fn())
  expect(event.getHandlers().length).toBe(2)
});

test("do not on same", () => {
  const event = createEvent()
  const cb = jest.fn()
  event.on(cb)
  event.on(cb)
  expect(event.getHandlers().length).toBe(1)
});

test("handler should be function", () => {
  const event = createEvent()
  expect(() => event.on(123)).toThrowError()
  expect(event.getHandlers().length).toBe(0)
});

test("off", () => {
  const event = createEvent()
  event.on(jest.fn())
  event.off(123)
  expect(event.getHandlers().length).toBe(1)
});

test("emit times", () => {
  const event = createEvent()
  const cb = jest.fn()
  event.on(cb)
  event.emit()
  event.emit()
  expect(cb).toHaveBeenCalledTimes(2)
});

test("once", () => {
  const event = createEvent()
  const cb = jest.fn()
  const cb2 = jest.fn()
  event.once(cb)
  event.on(cb2)
  expect(event.getHandlers().length).toBe(2)
  event.emit(123)
  event.emit(456)
  expect(cb).toBeCalledWith(123);
  expect(event.getHandlers().length).toBe(1)
  expect(cb).toHaveBeenCalledTimes(1)
  expect(cb2).toHaveBeenCalledTimes(2)
});

test("once off", () => {
  const event = createEvent()
  const cb = jest.fn()
  const cb2 = event.once(cb)
  expect(event.getHandlers().length).toBe(1)
  event.off(cb2)
  expect(event.getHandlers().length).toBe(0)
  event.emit(456)
  expect(cb).toHaveBeenCalledTimes(0)
});

test("makeEvent", () => {
  const onerror = jest.fn();
  const cb = jest.fn();
  const target = { onerror };
  makeEvent(target, 'onerror', 'error');
  expect(target.onError).toBeInstanceOf(Function);
  expect(target.offError).toBeInstanceOf(Function);
  expect(target.getErrorHandlers).toBeInstanceOf(Function);

  target.onError(cb);
  target.onerror(2);

  expect(onerror).toBeCalledWith(2);
  expect(cb).toBeCalledWith(2);

  expect(() => makeEvent(undefined, "onerror", "error")).toThrowError();
  expect(() => makeEvent({}, "", "error")).toThrowError();
  expect(() => makeEvent({}, "onerror", "")).toThrowError();
  expect(() => makeEvent({}, "onerror", "error")).not.toThrowError();
});

test("makeEvent off getHandlers", () => {
  const onerror = jest.fn();
  const cb = jest.fn();
  const target = { onerror };
  makeEvent(target, 'onerror', 'error');
  expect(target.onError).toBeInstanceOf(Function);
  expect(target.offError).toBeInstanceOf(Function);
  expect(target.getErrorHandlers).toBeInstanceOf(Function);

  target.onError(cb);
  target.onerror(2, 4);

  expect(onerror).toBeCalledWith(2, 4);
  expect(cb).toBeCalledWith(2, 4);

  expect(() => makeEvent(undefined, "onerror", "error")).toThrowError();
  expect(() => makeEvent({}, "", "error")).toThrowError();
  expect(() => makeEvent({}, "onerror", "")).toThrowError();
  expect(() => makeEvent({}, "onerror", "error")).not.toThrowError();
});
