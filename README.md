# guji

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]](travis-url)
[![NPM Download][dt-image]][npm-url]

This repository will provide some simple but useful function as lodash

The best advantage is the cute name.

# use
- install

```
npm install guji -S
```

- use

each api in single file. to use like arrToObj

```javascript
import arrToObj from 'guji/dist/arrToObj'
const obj = arrToObj([
  {key: 'key1', value: 'value1'},
  {key: 'key2', value: 'value2'}
], item => ([item.key, item.value]))
// {key1: "value1", key2: "value2"}
```

源码使用，让guji的源代码走babel编译

```javascript
// webpack.config.js
const guji = require('guji/guji.webpack')
const config = {} // config
module.exports = guji(config)
```
# api list

- arrToObj

```typescript
export default declare function arrToObj(arr: any[], fn: (value: any, index: number, array: any[]) => [string, any]): Object
```
数组转对象
```javascript

arrToObj([
  {key: 'key1', value: 'value1'},
  {key: 'key2', value: 'value2'}
], item => ([item.key, item.value])) 
// {key1: "value1", key2: "value2"}
```

- cache

```typescript
export default declare function cache(fn: Function, _thisArg?: any, resetReject?: boolean, keyFn?: (...args: any[]) => string): Function
```
缓存请求， 缓存计算；可配置keyFn按不同参数缓存;reject可清除缓存

```javascript
  var fibonacci = cache(function (n) {
    if (n <= 1) {
        return 1;    
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
  }, null, false, n => n)
  fibonacci(40)
  // 如果不用缓存，计算量会很大，很耗时
```

- callLimit

```typescript
export default declare function callLimit(fn: Function, limit?: number, _this?: any, callback?: Function): Function
```

限制调用次数；超过的次数有错误回调，默认会console.log，可以上报自定义错误等操作

```javascript
  const init = callLimit(function() {
    console.log('do init')
  }, 1, null, counter => console.log(`init extra call ${counter}`))
  init()
  init()
  // log do init
  // log init extra call 2

```

- event
```typescript
export default declare function createEvent(): {
  on: (handle: Function) => Function;
  once: (handle: Function) => Function;
  off: (handle?: Function) => void;
  emit: (data: any) => void;
  getHandlers: () => Array<Function>
}

export declare function makeEvent(target: Object, key: String, targetKey: String): void
```

createEvent，轻量级的事件处理。makeEvent，可用于对类似window.onerror的转化，转化成可以使用onError, onceError, offError等函数，解决多个地方想监听onerror的场景

```javascript
import {makeEvent} from 'guji/src/event'
makeEvent(window, 'onerror', 'error')
window.onError(err => console.log('1', err))
window.onError(err => console.log('2', err))
setTimeout(function() {
  throw new Error('error')
}, 0) // 控制台中直接写throw new Error()不触发onerror
// log 1 error
// log 2 error
```
- firstUppercase

首字母大写

- funSlice

```typescript
export declare function beforeSlice(target: Object, key: string, fn?: Function): void;
export declare function afterSlice(target: Object, key: string, fn?: Function): void;
```

给函数调用增加前置或后置操作

```javascript
import {beforeSlice, afterSlice} from 'guji/src/funSlice'
const component = {
  beforeRender() {
    console.log('beforeRender')
  },
  render() {
    console.log('render')
  }
}
beforeSlice(component, 'render')
afterSlice(component, 'render', () => console.log('afterRender'))
component.render()
// log beforeRender
// log render
// log afterRender
```

- getDefer

```typescript
interface defer {
  promise: Promise<any>,
  reject: (result: any) => void,
  resolve: (error: any) => void
}
export default declare function getDefer(msReject: number): defer
```

增加超时reject，不传msReject则不做超时处理

- getType {getType, isType}

```typescript
export declare function getType (val: any): string
export declare function isType (val: any, type: string): boolean
```

使用Object.prototype.toString.call判断数据类型

```javascript
getType(123) // Number
getType(NaN) // Number
getType([]) // Array
getType(undefined) Undefined
// isType会进行toLowerCase再做比较
isType(undefined, 'undefined') // true
```

- logResult

```typescript
export default declare function logResult(fn: Function, text?: string, _this?: any, callback?: Function): Function
```

对结果处理，默认log

- logTime

```typescript
export default declare function logTime(fn: Function, text?: string, _this?: any, callback?: Function): Function
```

统计函数执行事件，如果返回promise，会统计到promise状态变更的事件。拿到时间可以在回调中上报等操作，做性能统计，默认是log出来。如果不是计算函数的耗时，可以用timer，可以统计函数内某些操作的耗时，类似console.time的用法

```javascript
const request = logTime(function request() {
  return new Promise(resolve => setTimeout(resolve, 100))
}, 'request', null)
request()
// log request 102
```

- objToArr

```typescript
export default declare function objToArr(obj: object, fn: (value: any, index: number, array: any[]) => any): any[]
```

对象转数组，fn不传时等于Object.values

```javascript
objToArr({
  key1: 'value1',
  key2: 'value2'
}, item => ({key: item[0], value: item[1]}))
// [ { key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' } ]
```

- rateLimit

限制并发执行的次数

```javascript
import rateLimit from 'guji/src/rateLimit'
import sleep from 'guji/src/sleep'
const data = {}
async function getData(page) {
    await sleep(Math.random() * 100 | 0)
    data[page] = 1
}
const arr = Array.from({length: 20}).map((item, index) => index)
// tasks是数组
let tasks = arr
// tasks是函数，有时候远程获取数据
// let tasks = function () {
//   return arr.shift()
// }
// tasks迭代器
// let tasks = arr[Symbol.iterator]()
rateLimit(tasks, 4, getData).then(() => console.log(data))
```

- ready {emitReady, onReady, isReady}

```typescript
export declare function emitReady (eventName: string, data: any): void
export declare function onReady(eventName: string, fn?: Function): Promise<any>
export declare function isReady(eventName: string): boolean

很实用的API，目前event全局维护，需要可以配合命名空间实用

```javascript
import {emitReady, onReady} from 'guji/src/ready'
function getUserInfo() {
  const userInfo = {} // getUserInfo
  emitReady('global.userInfo', userInfo)
}

async function getTableData() {
  const userInfo = await onReady('global.userInfo')
  // to getTableData
}
```

- ReconnectSocket

socket，断线自动重连

- refresh

```typescript
export default declare function refresh(fn: () => Promise<any>, _thisArg?: any): Function
```

重复获取数据，如搜索情况和翻页情况。应该会加debounce，但还是有情况会连续发请求，如果先发的请求后到，数据是不对的。使用refresh确保你使用的最新的数据，如果后发的请求已经结束，之前的请求就算成功了，也会reject

```javascript
const table = {data: 0}
const getData = refresh(
    (msTimer, data) => new Promise(resolve => setTimeout(resolve, msTimer, data))
)
const setTableData = async (msTimer, data) => {
    try {
        table.data = await getData(msTimer, data)
    } catch (e) {
        console.log(e.message)
    }
}
setTableData(200, 1)
setTableData(100, 2)
setTimeout(() => {
    console.log(table.data)
}, 300)

// log data has expired
// log 2
// 去掉refresh，最后得到的table.data为1，是不符合预期的
```

- retry

```typescript
export default declare function retry(fn: Function, retryTimes?: number, _this?: any, onerror?: Function): Function
```

失败自动重试，可以设置次数，每次错误都有回调，可以做用户提醒

- safeFun

对函数加一层try/catch

- safeObj

对象中的所有函数加一层try/catch，没有做递归处理

- safeParse

```typescript
export default declare function safeParse (str: any, defaultVal: any): any
```

对parse操作加try/catch，对于失败的操作，可以设置默认返回值

- sleep

```typescript
export default declare function sleep (ms: number, PromiseValue?: any): Promise<any>
```

多线程可以让线程休眠，但是这里不是哦。配合async/await使用体验更好

```javascript
async function () {
  // do A
  await sleep(1000)
  // do B
}
```

- timeout

```typescript
export default declare function timeout(fn: Function | Promise<any>, ms?: number, _this?: any): Function | Promise<any>
```
对函数或者promise做超时处理

- timer

```typescript
export default declare function timer () : (label: any, cb: Function) => void
```

统计时间差，和console.time、console.timeEnd的差别是不用key做标记，上层函数可以重复连续调用，可以得到时间做下一步操作

```javascript
import timer from 'guji/src/timer'
import sleep from 'guji/src/sleep'
async function request (params){
  // do A
  const timerEnd = timer()
  // do B
  await sleep(Math.random() * 100)
  timerEnd(params, (consumer, params) => {
    console.log(`request-${params}: ${consumer}`)
  })
}
request('a')
request('b')
// log request-a: 35[0-100]
// log request-b: 82[0-100]
```

## LICENSE ##

MIT License


[npm-url]: https://npmjs.org/package/guji
[npm-image]: https://badge.fury.io/js/guji.png
[travis-image]: https://travis-ci.com/dyw934854565/guji.svg?branch=master
[travis-url]: https://travis-ci.com/dyw934854565/guji
[dt-image]:https://img.shields.io/npm/dt/guji.svg
