import EventEmitter from 'events'

const _open = Symbol('_open')
const _setStatus = Symbol('_setStatus')
const _status = Symbol('_status')
export const statusCode = {
  init: 0,
  connecting: 1,
  connected: 2,
  closed: 3,
  error: 4
}
export default class ReconnectSocket extends EventEmitter {
  constructor (WebSocket, ...args) {
    super()
    this.args = args
    this.WebSocket = WebSocket
    this[_setStatus](statusCode.init)
    this.on('netchange', res => {
      if (res.isConnected && this[_status] === statusCode.error) {
        this[_open](true)
      }
    })
    this[_open]()
  }
  [_setStatus] (status) {
    console.log('ws status change', status)
    this[_status] = status
  }
  [_open] (isReconnect = false) {
    this[_setStatus](statusCode.connecting)
    const ws = (this.ws = new this.WebSocket(...this.args))
    if (isReconnect === true) {
      this.emit('reconnect', false)
    }
    ws.onopen = () => {
      this[_setStatus](statusCode.connected)
      this.emit('open', isReconnect)
      if (isReconnect === true) {
        this.emit('reconnect', true)
      }
    }
    ws.onclose = () => {
      if (this[_status] === statusCode.error) {
        return
      }
      ws.onclose = null
      ws.onopen = null
      ws.onerror = null
      ws.onmessage = null
      ws.close(100)
      if (this[_status] === statusCode.closed) {
        return
      }
      this[_open](true)
    }
    ws.onmessage = res => {
      this.emit('message', res)
    }
    ws.onerror = err => {
      this[_setStatus](statusCode.error)
      this.emit('error', err)
    }
  }
  getStatus () {
    return this[_status]
  }
  send (...args) {
    if (
      this[_status] === statusCode.closed ||
      this[_status] === statusCode.error
    ) {
      throw new Error('websocket is closed' + this[_status])
    }
    if (this[_status] === statusCode.connected) {
      this.ws.send(...args)
    } else {
      this.once('open', () => {
        this.send(...args)
      })
    }
  }
  close () {
    this[_setStatus](statusCode.closed)
    this.ws.close()
  }
}
