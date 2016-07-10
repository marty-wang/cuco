# Essentials of JavaScript functional programming

* Curry
* Compose

You don't need use some library to do functional programming in JavaScript, because curry and compose are all you need.

**This is a universal library that can work in browser as well as nodejs.**

# Install

```
npm install cuco
```

# Test

```
npm run test
```

# Samples

```
import cuco from 'cuco'

// curry
const curried = cuco.curry((a, b, c) => `${a} ${b} ${c}`)
curried('a')('b')('c') // 'a b c'

// compose
const combine = (...args) => args.join(' ')
const shout = (x) => x.toUpperCase()
const emphasize = (x) => `${x}!`
const yell = cuco.compose(emphasize, shout, combine)
yell('hello', 'world') // 'HELLO WORLD!'

```