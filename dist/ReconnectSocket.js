'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusCode = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _open = Symbol('_open');
const _setStatus = Symbol('_setStatus');
const _status = Symbol('_status');
const statusCode = exports.statusCode = {
  init: 0,
  connecting: 1,
  connected: 2,
  closed: 3,
  error: 4
};
class ReconnectSocket extends _events2.default {
  constructor(WebSocket, ...args) {
    super();
    this.args = args;
    this.WebSocket = WebSocket;
    this[_setStatus](statusCode.init);
    this.on('net-change', res => {
      if (res.isConnected) {
        this[_open](true);
      }
    });
    this[_open]();
  }
  [_setStatus](status) {
    this.emit('status-change', status);
    this[_status] = status;
  }
  [_open](isReconnect = false) {
    if (this[_status] === statusCode.closed) {
      throw new Error('websocket is closed' + this[_status]);
    }
    if (this[_status] !== statusCode.error) {
      return;
    }
    this[_setStatus](statusCode.connecting);
    const ws = this.ws = new this.WebSocket(...this.args);
    if (isReconnect === true) {
      this.emit('reconnect', false);
    }
    ws.onopen = () => {
      this[_setStatus](statusCode.connected);
      this.emit('open', isReconnect);
      if (isReconnect === true) {
        this.emit('reconnect', true);
      }
    };
    ws.onclose = () => {
      ws.onclose = null;
      ws.onopen = null;
      ws.onerror = null;
      ws.onmessage = null;
      this[_open](true);
    };
    ws.onmessage = res => {
      this.emit('message', res);
    };
    ws.onerror = err => {
      this[_setStatus](statusCode.error);
      this.emit('error', err);
    };
  }
  getStatus() {
    return this[_status];
  }
  send(...args) {
    this[_open](true);
    if (this[_status] === statusCode.connected) {
      this.ws.send(...args);
    } else {
      this.once('open', () => {
        this.send(...args);
      });
    }
  }
  close(code) {
    this[_setStatus](statusCode.closed);
    this.ws.close(code);
  }
}
exports.default = ReconnectSocket;