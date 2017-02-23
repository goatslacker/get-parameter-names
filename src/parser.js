import 'babel-polyfill';

const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const SPACES = /\s/mg;
const BEFORE_OPENING_PAREN = /^[^(]*\(/mg;
const AFTER_CLOSING_PAREN = /^([^)\s]*)\).*$/mg;
const NEW_LINES = /\r?\n|\r/mg;

const nonVarChars = ['=', '(', ')', ','];

function *matchNexter(string) {
  //if (string[0] === '(')
  console.log(`Chopping ${string}`);
  function updateIndex(stringIndex) {
    console.log(`Updating index starting at: ${stringIndex}`);
    return indexes.map((foundAt, i)  => {
      if (foundAt === stringIndex) {
        return string.indexOf(nonVarChars[i], foundAt + 1);
      }
      return foundAt;
    })
  }

  function minIndex() {
    return Math.min.apply(Math, indexes
      .filter(i => i > -1));
  }

  let indexes = nonVarChars
    .map(c => string.indexOf(c));
  let index = 0;

  while (index !== Infinity) {
    const nextIndex = minIndex();
    console.log(`String: ${string}\nIndexes: ${indexes}\nIndex: ${index}\nNextIndex: ${nextIndex}`);
    if (nextIndex !== Infinity) {
      const subString = string.slice(index, nextIndex);
      const ret = {
        subString,
        start: index,
        end: nextIndex
      };
      console.log(ret);
      yield ret;
    } else if (string.length) {
      const subString = string.slice(index);
      const ret = {
        subString,
        start: index,
        end: string.length
      };
      console.log(ret);
      yield ret;
    }
    index = nextIndex;
    indexes = updateIndex(index);
  }
}

function *createElements(string) {
  const regExpression = /[\=\,\(\)^]/gi;
  let index = 0;
  let myArray;

  for (let index of matchNexter(string)) {
    yield
  }
  while ((myArray = regExpression.exec(string)) !== null) {
    yield {
      subString: string.slice(index, regExpression.lastIndex - 1),
      start: index,
      end: regExpression.lastIndex
    };
    index = regExpression.lastIndex;
  }
  if (index === 0) {
    yield {
      subString: string,
      start: index,
      end: string.length - 1
    }
  }
}

export default function parse(string) {
  // console.log(string.toString()
  // .replace(NEW_LINES, '')
  // .replace(COMMENTS, '')
  // .replace(SPACES, '')
  // .replace(BEFORE_OPENING_PAREN, ''));
  const gen = matchNexter(string
    .toString()
    .replace(NEW_LINES, '')
    .replace(COMMENTS, '')
    .replace(SPACES, '')
  );

  let next = gen.next();
  let value = next.value;
  let argsEnded = false;
  let firstVar = true;
  let depth = {
    defaultParams: 0,
    parenthesis: 0
  };

  const vars = [];
  if (value && value.subString && value.subString.length) {
    vars.push(value.subString);
  }
  console.log(`Starting var: ${vars}`);
  next = gen.next();
  value = next.value;
  while (value !== undefined && !argsEnded) {
    console.log(`Continuing with ${value.subString}`);
    const firstChar = value.subString[0];
    console.log(`firstChar: ${firstChar}`);
    if (firstChar === '=') {
      if (value.subString[1] === '>' && depth.defaultParams === 0) {
        console.log('Found =>');
        argsEnded = true;
      } else {
        console.log('Found =')
        depth.defaultParams++;
      }
    } else if (firstChar === '(' && !firstVar && vars.length) {
      console.log('Found (')
      depth.parenthesis++;
    } else if (firstChar === '(' && firstVar) {
      vars.pop();
    } else if (firstChar === ')' && depth.parenthesis > 0) {
      console.log('Found )');
    } else if (firstChar === ',' || (firstChar === '(' && vars.length === 0)) {
      console.log('Found \'')
      if (depth.parenthesis === 0) {
        depth.defaultParams === 0;
        console.log(`Pushing to vars: ${value.subString.slice(1)}`)
        vars.push(value.subString.slice(1));
      }
    }
    next = gen.next();
    value = next.value;
    firstVar = false;
  }
  return vars;
}
