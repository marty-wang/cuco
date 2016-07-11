# Essentials of JavaScript functional programming

* curry
* compose
* composeP(romise)
* debounce
* throttle

Most of JavaScript functional programming libraries are equipped with tons of functions you may never ever use.
The functions you actually need and use are fairly small and easy to write, except for the ones like curry and compose, which are the heart of functional programming but kinda tricky.

This library is just about the essential functions and the goal is to help you with JavaScript functional programming without bloating your app.

**This is a universal library that can work in browser as well as nodejs.**

# Install

```
npm install cuco
```

# Test

```
npm install
npm run test
```

# Samples

```
import cuco from 'cuco'

// === curry ===

const curried = cuco.curry((a, b, c) => `${a} ${b} ${c}`)
curried('a', 'b', 'c') // 'a b c'
curried('a', 'b')('c') // 'a b c'
curried('a')('b', 'c') // 'a b c'
curried('a')('b')('c') // 'a b c'

// === compose ===

const fn1 = (input) => `${input} fn1`;
const fn2 = (input) => `${input} fn2`;
const fn3 = (input) => `${input} fn3`;
const composed = cuco.compose(fn3, fn2, fn1);
composed('test') // 'test fn1 fn2 fn3'

// === composeP ===

const fn1 = (input) => Promise.resolve(`${input} fn1`);
const fn2 = (input) => `${input} fn2`;
const fn3 = (input) => Promise.resolve(`${input} fn3`);
const composed = cuco.composeP(fn3, fn2, fn1);
composed('test').then((result) => {
    // 'test fn1 fn2 fn3'
});

// === debounce ===

let count = 0;
let result = 1;
const fn = (input) => {
    count++;
    result *= input;
};
const debounced = cuco.debounce(fn, 500);
debounced(2);
debounced(2);
debounced(2);
// after 500ms, count is 1 and result is 2

// === throttle ===

let count = 0;
let result = 2;
const fn = (input) => {
    count++;
    result *= input;
};
const throttled = cuco.throttle(fn, 250);

throttled(result);
const interval = setInterval(() => throttled(result), 50);
setTimeout(() => {
    clearInterval(interval);
    // count is 3 and result is 256
}, 600);
```