var retrieveArguments = require("../index");
var expect = require("chai").expect;

describe("get-parameter-names", function () {
  it("returns an array with the argument names of a function", function () {
    var func = function (hello,world) {};
    var args = retrieveArguments(func);
    expect(args).to.deep.equal(["hello", "world"]);
  });

  it("removes spaces from the arguments", function () {
    var func = function (   hello   , world   ) {};
    var args = retrieveArguments(func);
    expect(args).to.deep.equal(["hello", "world"]);
  });

  it("returns an empty array if there isn't any arguments", function () {
    var func = function () {};
    var args = retrieveArguments(func);
    expect(args).to.deep.equal([]);
  });

  it("throws an error if the argument isn't a function", function () {
    expect(retrieveArguments.bind(null, "hello")).to.throw();
  });
});
