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

const debounce = (fn, wait) => {
  let lastRequest;
  let timer;

  return (...args) => {
    lastRequest = Date.now();

    const onTimeout = () => {
      const elapsed = Date.now() - lastRequest;

      if (elapsed < wait) {
        timer = setTimeout(onTimeout, wait - elapsed);
      } else {
        timer = null;
        fn.apply(null, args);
      }
    };

    if (!timer) {
      timer = setTimeout(onTimeout, wait);
    }
  };
};

const throttle = (fn, wait) => {
  let initial;
  let timer;

  return (...args) => {
    if (!initial) {
      fn.apply(null, args);
      initial = true;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(null, args);
        timer = null;
      }, wait);
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
