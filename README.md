# Essentials of JavaScript functional programming

* curry
* compose
* composeP(romise)

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
const composed = cuco.compose(emphasize, shout, combine)
composed('hello', 'world') // 'HELLO WORLD!'

// composeP
const fn1 = (input) => Promise.resolve(`${input} fn1`);
const fn2 = (input) => `${input} fn2`;
const fn3 = (input) => Promise.resolve(`${input} fn3`);
const composed = cuco.composeP(fn3, fn2, fn1);
composed('test').then((result) => {
    // 'test fn1 fn2 fn3'
});
```