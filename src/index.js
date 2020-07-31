const curry = fn =>
  (...args) => args.length >= fn.length ? fn.apply(null, args) : function internal(...args1) {
    args = args.concat(args1);
    return args.length >= fn.length ? fn.apply(null, args) : internal;
  };

const compose = (...fns) =>
  (...args) => fns.reduceRight((previous, fn) => fn.apply(null, [].concat(previous)), args);

const composeP = (...fns) =>
  (...args) => fns.reduceRight(
    (previous, fn, idx) => idx === fns.length - 1 ? fn.apply(null, previous) : previous.then(fn), args
  );

export const debounce = (fn, wait) => {
  let timer;
  let lastRequest;
  let latestArgs;

  return (...args) => {
    lastRequest = Date.now();
    latestArgs = args;

    if (!timer) {
      fn(...latestArgs);
    }

    const onTimeout = () => {
      const elapsed = Date.now() - lastRequest;

      if (elapsed < wait) {
        setTimeout(onTimeout, wait - elapsed);
      } else {
        fn(...latestArgs);
        timer = null;
      }
    };

    if (!timer) {
      timer = setTimeout(onTimeout, wait);
    }
  };
};

// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  
  return (...args) => {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        func.apply(null, args);
        lastRan = Date.now();
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default {
  curry,
  compose,
  composeP,
  debounce,
  throttle
};
