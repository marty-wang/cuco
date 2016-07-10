const curry = fn =>
  (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    }

    return function internal(...args1) {
      args = args.concat(args1);

      if (args.length >= fn.length) {
        return fn.apply(null, args);
      }

      return internal;
    };
  };

const compose = (...fns) =>
  (...args) => fns.reduceRight((previous, fn) => fn.apply(null, [].concat(previous)), args);

const composeP = (...fns) =>
  (...args) => fns.reduceRight(
    (previous, fn, idx) => idx === fns.length - 1 ? fn.apply(null, previous) : previous.then(fn), args
  );

export default {
  curry,
  compose,
  composeP
};
