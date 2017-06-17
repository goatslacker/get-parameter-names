
'use strict';

var arg = require('../');
var expect = require('chai').expect;

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

  it('supports ES2015 fat arrow functions with parens', function() {
    var f = '(a,b) => a + b'

    expect(arg(f)).to.deep.equal(['a', 'b']);
  })

  it('supports ES2015 fat arrow functions without parens', function() {
    var f = 'a => a + 2'
    expect(arg(f)).to.deep.equal(['a']);
  })

  it('ignores ES2015 default params', function() {
    // default params supported in node.js ES6
    var f11 = '(a, b = 20) => a + b'

    expect(arg(f11)).to.deep.equal(['a', 'b']);
  })

  it('supports function created using the Function constructor', function() {
    var f = new Function('a', 'b', 'return a + b');

    expect(arg(f)).to.deep.equal(['a', 'b']);
  })

  it('supports ES2015 class constructor with static get before constructor', function() {
    var f = 'class Cat {\n      static get foo () {\n  ' +      
     'return [];\n      }\n      static get bar () {\n' +
     'return [];\n      }\n      constructor(a, b){}\n    }';

    expect(arg(f)).to.deep.equal(['a', 'b']);
  })
});
