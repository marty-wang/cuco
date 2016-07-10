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
  (...args) => fns.reduceRight((input, fn) => fn.apply(null, [].concat(input)), args);

export default {
  curry,
  compose
};
