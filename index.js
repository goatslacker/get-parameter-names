module.exports = function (func) {
  if(typeof func !== "function") throw "Not a function";
  var res = /\s*function\s*\(([^)]*)/.exec(func)[1];
  res = res.replace(/\s/g, "");
  res = res !== "" ? res.split(",") : [];
  return res;
};
