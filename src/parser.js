import 'regenerator-runtime/runtime';
import debugFactory from 'debug';
const debug = debugFactory('getParameterNames');

const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const SPACES = /\s/mg;
const NEW_LINES = /\r?\n|\r/mg;
const ASYNC = /^\s*async(\s*|\()(?!\s*\=)/;

const nonVarChars = ['=', '(', ')', ','];

function *matchNexter(string) {
  debug(`Chopping ${string}`);
  function updateIndex(stringIndex) {
    debug(`Updating index starting at: ${stringIndex}`);
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
    debug(`String: ${string}\nIndexes: ${indexes}\nIndex: ${index}\nNextIndex: ${nextIndex}`);
    if (nextIndex !== Infinity) {
      const subString = string.slice(index, nextIndex);
      const ret = {
        subString,
        start: index,
        end: nextIndex
      };
      debug(ret);
      yield ret;
    } else if (string.length) {
      const subString = string.slice(index);
      const ret = {
        subString,
        start: index,
        end: string.length
      };
      debug(ret);
      yield ret;
    }
    index = nextIndex;
    indexes = updateIndex(index);
  }
}

export default function parse(string) {
  const gen = matchNexter(string
    .toString()
    .replace(NEW_LINES, '')
    .replace(COMMENTS, '')
    .replace(ASYNC, '')
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
    debug(`Pushing ${value.subString} to vars to start`);
    vars.push(value.subString);
  }
  debug(`Starting var: ${vars}`);
  next = gen.next();
  value = next.value;
  while (value !== undefined && !argsEnded) {
    debug(`Continuing with ${value.subString}`);
    const firstChar = value.subString[0];
    debug(`firstChar: ${firstChar}`);
    debug(`firstVar: ${firstVar}`);
    debug(`argsEnded: ${argsEnded}`);
    debug(`depth: ${JSON.stringify(depth)}`);
    debug(`Current vars: ${vars}`);
    if (firstChar === '=') {
      if (value.subString[1] === '>' && depth.defaultParams === 0) {
        debug('Found =>');
        argsEnded = true;
      } else {
        debug('Found =')
        depth.defaultParams++;
      }
    } else if (firstChar === '(' && !firstVar && vars.length) {
      firstVar = true;
      debug('Found (');
      depth.parenthesis++;
    } else if (firstChar === '(' && firstVar) {
      debug(`Removing function name from vars`);
      vars.pop();
      const newVar = value.subString.slice(1);
      if(newVar.length) {
        debug(`Pushing to vars: ${newVar}`)
        vars.push(newVar);
      }
      firstVar = false;
    } else if (firstChar === ')' && depth.parenthesis > 0) {
      debug('Found )');
      depth.parenthesis--;
    } else if (firstChar === ')' && depth.parenthesis === 0) {
      debug('Found ) and we are done');
      argsEnded = true;
    } else if (firstChar === ',' || (firstChar === '(' && vars.length === 0)) {
      const newVar = value.subString.slice(1);
      debug(`Found '${newVar}'`);
      if (depth.parenthesis === 0) {
        depth.defaultParams = 0;
        debug(`Pushing to vars: ${newVar}`)
        vars.push(newVar);
      }
    }
    next = gen.next();
    value = next.value;
  }
  return vars;
}
