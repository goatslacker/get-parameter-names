[![Build Status](https://secure.travis-ci.org/goatslacker/get-parameter-names.png)](http://travis-ci.org/goatslacker/get-parameter-names)
[![NPM version](https://badge.fury.io/js/get-parameter-names.png)](http://badge.fury.io/js/get-parameter-names)
[![Dependency Status](https://david-dm.org/goatslacker/get-parameter-names.png)](https://david-dm.org/goatslacker/get-parameter-names)

get-parameter-names
===================

Retrieves the argument names of a function

## Install

```
npm install get-parameter-names
```

## Usage

```js
function foo(bar, baz) {
  return bar + baz
}

var get = require('get-parameter-names')
get(foo) // = ['bar', 'baz']
```

Also supports fat arrow and default functions

```js
const foo = (a, b = 20) => a + b

var get = require('get-parameter-names')
get(foo) // = ['a', 'b']
```

Also supports ES6 async functions

```js
async function foo(a, b) { return a + b }

var get = require('get-parameter-names')
get(foo) // = ['a', 'b']
```

Also supports ES6 Class constructors

```js

var get = require('get-parameter-names')

class Animal{
  constructor(){}
}
class Cat extends Animal{
  constructor(a, b){
    super();
    get(this.constructor) // = ['a', 'b']
  }
}

get(Cat) // = ['a', 'b']
```

## Tests

```
npm test
```

## License

[MIT](http://josh.mit-license.org)
