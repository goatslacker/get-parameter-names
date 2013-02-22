var esprima = require('esprima')

function getParameterNames(ƒunction) {
  return esprima.parse('({f:' + ƒunction.toString() + '})')
    .body[0]
    .expression
    .properties[0]
    .value
    .params.map(function (x) {
      return x.name
    })
}

module.exports = getParameterNames
