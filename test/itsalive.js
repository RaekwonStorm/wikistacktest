// var mocha = require('../mocha');
var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

xdescribe("two plus two", function() {
  it('takes two and adds two to it', function () {
  expect(2+2).to.equal(4);
  })
})

// describe("async function test", function() {

//   it('tests whether a setTimeout of 1000 takes approximately 1000ms', function () {
//     expect(setTimeout).
//   })

// })


xdescribe("spy testing", function () {

  var testFunc = function () {
    console.log("Did this work?");
    return "Hi mom!";
  }

  testFunc = chai.spy(testFunc);

  var array = [1,2,3,4]

  it("sees how many times the function was run", function () {
    chai.spy.on(array, "forEach");
    array.forEach(testFunc)
    expect(testFunc).to.have.been.called(array.length);
  })
})
