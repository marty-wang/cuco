import chai from 'chai';
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
  it('should work', () => {
    const combine = (...args) => args.join(" ");
    const shout = (x) => x.toUpperCase()
    const emphasize = (x) => `${x}!`;
    const yell = cuco.compose(emphasize, shout, combine);
    expect(yell('hello', 'world')).to.be.equal('HELLO WORLD!');
  });
});