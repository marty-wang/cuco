import chai from 'chai';
import Q from 'q';
import cuco from '../lib/cuco.js';

chai.expect();

const expect = chai.expect;

describe('curry', () => {
  it('should work', () => {
    const curried = cuco.curry((a, b, c) => `${a} ${b} ${c}`);

    expect(curried('a', 'b', 'c')).to.be.equal('a b c');
    expect(curried('a', 'b')('c')).to.be.equal('a b c');
    expect(curried('a')('b', 'c')).to.be.equal('a b c');
    expect(curried('a')('b')('c')).to.be.equal('a b c');
  });
});

describe('compose', () => {
  it('should work with one function', () => {
    const combine = (...args) => args.join(' ');
    const composed = cuco.compose(combine);

    expect(composed('hello', 'world')).to.be.equal('hello world');
  });

  it('should work with multiple functions', () => {
    const combine = (...args) => args.join(' ');
    const shout = (x) => x.toUpperCase()
    const emphasize = (x) => `${x}!`;
    const composed = cuco.compose(emphasize, shout, combine);

    expect(composed('hello', 'world')).to.be.equal('HELLO WORLD!');
  });
});

describe('composeP', () => {
  it('should work with one function', (done) => {
    const fn1 = (input) => Q(`${input} fn1`);
    const composed = cuco.composeP(fn1);

    composed('test').then((result) => {
      expect(result).to.be.equal('test fn1');
      done();
    });
  });

  it('should work with multiple functions', (done) => {
    const fn1 = (input) => Q(`${input} fn1`);
    const fn2 = (input) => `${input} fn2`;
    const fn3 = (input) => Q(`${input} fn3`);
    const composed = cuco.composeP(fn3, fn2, fn1);

    composed('test').then((result) => {
      expect(result).to.be.equal('test fn1 fn2 fn3');
      done();
    });
  });
});