# guji

[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.com/dyw934854565/guji.svg?branch=master)](https://travis-ci.com/dyw934854565/guji)
![][david-url]
![][dt-url]

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
import arrToObj from 'guji/src/arrToObj'
const obj = arrToObj([
  {key: 'key1', value: 'value1'},
  {key: 'key2', value: 'value2'}
], item => ([item.key, item.value]))
// {key1: "value1", key2: "value2"}
```
# api list

- arrToObj

declare function arrToObj(arr: any[], fn: (value: any, index: number, array: any[]) => [string, any]): Object

- cache

- callLimit

- event

- firstUppercase

- funSlice

- getDefer

- getType {getType, isType}

- logResult

- logTime

- objToArr

- retry

- ready {emitReady, onReady, isReady}

- ReconnectSocket

- refresh

- retry

- safeFun

- safeObj

- safeParse

- sleep

- timeout

- timer

## LICENSE ##

MIT License


[npm-url]: https://npmjs.org/package/guji
[npm-image]: https://badge.fury.io/js/guji.png
[david-url]: https://david-dm.org/leftstick/guji.png
[dt-url]:https://img.shields.io/npm/dt/guji.svg
