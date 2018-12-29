# guji

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
import arrToObj from 'guji/arrToObj'
const obj = arrToObj([
  {key: 'key1', value: 'value1'},
  {key: 'key2', value: 'value2'}
], item => ([item.key, item.value]))
// {key1: "value1", key2: "value2"}
```
# api list

- arrToObj

- objToArr

- cache

- retry

- getDefer

- sleep

- getType {getType, isType}

- logResult

- logTime

- safeFun

- safeObj

- safeParse

- ReconnectSocket

- ready {emitReady, onReady}
