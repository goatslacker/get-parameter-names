var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var DEFAULT_PARAMS = /=[^,]+/mg;
var FAT_ARROWS = /=>.*$/mg;
var SPACES = /\s/mg;
var BEFORE_OPENING_PAREN = /^[^(]*\(/mg;
var AFTER_CLOSING_PAREN = /^([^)]*)\).*$/mg;

function getParameterNames(fn) {
  var code = fn.toString()
    .replace(SPACES, '')
    .replace(COMMENTS, '')
    .replace(FAT_ARROWS, '')
    .replace(DEFAULT_PARAMS, '')
    .replace(BEFORE_OPENING_PAREN, '')
    .replace(AFTER_CLOSING_PAREN, '$1');

  return code.split(',')
}

module.exports = getParameterNames;
