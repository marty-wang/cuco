const curry = fn =>
  (...args) => args.length >= fn.length ?
    fn.apply(null, args) :
    function internal(...args1) {
      args = args.concat(args1);
      return args.length >= fn.length ? fn.apply(null, args) : internal;
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
