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
    const fn1 = (input) => `${input} fn1`;
    const composed = cuco.compose(fn1);

    expect(composed('test')).to.be.equal('test fn1');
  });

  it('should work with multiple functions', () => {
    const fn1 = (input) => `${input} fn1`;
    const fn2 = (input) => `${input} fn2`;
    const fn3 = (input) => `${input} fn3`;
    const composed = cuco.compose(fn3, fn2, fn1);

    expect(composed('test')).to.be.equal('test fn1 fn2 fn3');
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

describe('debounce', () => {
  it('should only execute the function after the wait', (done) => {
    let count = 1;
    const fn = (input) => count *= input;
    const debounced = cuco.debounce(fn, 50);

    debounced(2);
    debounced(2);

    expect(count).to.be.equal(1);

    Q.delay(10)
      .then(() => debounced(2))
      .delay(30)
      .then(() => {
        expect(count).to.be.equal(1);
      })
      .delay(20)
      .then(() => {
        expect(count).to.be.equal(2);
        done();
      });
  });
});