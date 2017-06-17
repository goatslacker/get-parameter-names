
get-parameter-names
===================

Retrieves the argument names of a function

## Install

```
npm install @captemulation/get-parameter-names
```

## Usage

```js
function foo(bar, baz) {
  return bar + baz
}

var get = require('@captemulation/get-parameter-names')
get(foo) // = ['bar', 'baz']
```

Also supports fat arrow and default functions

```js
const foo = (a, b = 20) => a + b

var get = require('@captemulation/get-parameter-names')
get(foo) // = ['a', 'b']
```

Also supports ES6 async functions

```js
async function foo(a, b) { return a + b }

var get = require('@captemulation/get-parameter-names')
get(foo) // = ['a', 'b']
```

Also supports ES6 Class constructors

```js

var get = require('@captemulation/get-parameter-names')

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
