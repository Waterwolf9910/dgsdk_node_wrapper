let index = require("../index")
let assert = require("assert")
let mocha = require('mocha')

console.log(index)

describe("main#hello()", function () {
    it("should return 'world'", function() {
        assert.strictEqual(index.hello(), 'world')
    })
})

// describe("main#hello_obj", function () {
//     it("should return a object with a function in it", function() {
//         assert.equal(index.hello_obj(), {
//             hello: () => {}
//         })
//     })
// })
