import createEvent from './event'

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
  event.on(123)
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
})