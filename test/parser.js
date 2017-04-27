import arg from '../src';
import chai from 'chai';

const { expect } = chai;

describe('function tests', function () {
  it('test1', function () {
    function /* (no parenthesis like this) */ test1(a, b, c){
      return true
    }
    expect(arg(test1)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test2', function () {
    function test2(a, b, c) /*(why do people do this??)*/{
      return true
    }

    expect(arg(test2)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test3', function () {
    function test3(a, /* (jewiofewjf,wo, ewoi, werp)*/ b, c) {
      return true
    }

    expect(arg(test3)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test4', function () {
    function test4(a/* a*/, /* b */b, /*c*/c,d/*d*/) {
      return function (one, two, three) {
      }
    }

    expect(arg(test4)).to.deep.equal(['a', 'b', 'c', 'd']);
  });

  it('test5', function () {
    function test5(
      a,
      b,
      c
    ) {
      return false;
    }

    expect(arg(test5)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test6', function () {
    function test6(a) { return function f6(a, b) { } }

    expect(arg(test6)).to.deep.equal(['a']);
  });

  it('test7', function () {
    function test7(
    /*
     function test5(
       a,
       b,
       c
     ) {
       return false;
     }
     function test5(
       a,
       b,
       c
     ) {
       return false;
     }
     function test5(
       a,
       b,
       c
     ) {
       return false;
     }
     */
    a,b,c) { return true }

    expect(arg(test7)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test8', function () {
    function                                               test8
                               (a,b,c){}

    expect(arg(test8)).to.deep.equal(['a', 'b', 'c']);
  });

  it('test9', function () {
    function π9(ƒ, µ) { (a + 2 + b + 2 + c) }

    expect(arg(π9)).to.deep.equal(['ƒ', 'µ']);
  });

  it('test10', function() {
    function test9() {}
    expect(arg(test9)).to.deep.equal([]);
  });

  it('supports ES2015 fat arrow functions with parens', function () {
    var f = '(a,b) => a + b'

    expect(arg(f)).to.deep.equal(['a', 'b']);
  });

  it('supports ES2015 fat arrow functions without parens', function () {
    var f = 'a => a + 2'
    expect(arg(f)).to.deep.equal(['a']);
  });

  it('supports ES2015 fat arrow functions without parens and new line no parens fat arrow function', function () {
    var f = 'a => a.map(\n b => b)';
    expect(arg(f)).to.deep.equal(['a']);
  });

  it('supports ES2015 fat arrow function without parens test1.', function() {
    var f = 'c => {\n'
      + '  var test2 = c.resolve();\n'
      + '  return new Test3(test2);\n'
      +'}';

    expect(arg(f)).to.deep.equal(['c']);
  })

  it('supports ES2015 fat arrow function without parens test2.', function() {
    var f = 'a => {\n'
      + '  return new Promise((resolve, reject) => {\n'
      + '    setTimeout(() => resolve(a * 2), 500);\n'
      + '  })'
      + '}'

    expect(arg(f)).to.deep.equal(['a']);
  });

  it('supports ES2015 fat arrow function without parens test3.', function() {
    var f = 'items => items.map(\n'
      + '  i => t.foo)';

    expect(arg(f)).to.deep.equal(['items']);
  })

  it('supports ES2015 fat arrow function without arguments.', function() {
    var f = '() => 1';

    expect(arg(f)).to.deep.equal([]);
  });

  it('ignores ES2015 default params', function() {
    // default params supported in node.js ES6
    var f11 = '(a, b = 20) => a + b'

    expect(arg(f11)).to.deep.equal(['a', 'b']);
  });

  it('supports function created using the Function constructor', function () {
    var f = new Function('a', 'b', 'return a + b');

    expect(arg(f)).to.deep.equal(['a', 'b']);
  });

  it('supports ES2015 default params with fat arrow function with multiple arguments', function () {
    var f = '( a = 1 , b=2, c = (err, data)=>{}) => {}';

    expect(arg(f)).to.deep.equal(['a', 'b', 'c']);
  });

  it('ES2015 default params with fat arrow function in middle', function () {
    var f = '( a = 1 , b= (err, data)=>{}, c = 3) => {}';

    expect(arg(f)).to.deep.equal(['a', 'b', 'c']);
  });

  it('ES2015 default params with var re-assignment to an argument like value', function () {
    var f = 'function f(id = 1){ id = \'a,b\'; }';

    expect(arg(f)).to.deep.equal(['id']);
  });
});
