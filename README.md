# Essentials of JavaScript functional programming

* Curry
* Compose

Most of JavaScript functional programming libraries are equipped with tons of functions you may never ever use.
The ones you actually need and use are fairly small and easy to write, except for curry and compose, which are the heart of functional programming but kinda tricky.

This library is just about curry and compose and the goal is to help you with JavaScript functional programming without bloating your app.

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