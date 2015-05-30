/*!
 * acorn-extract-comments <https://github.com/tunnckoCore/acorn-extract-comments>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var acornExtractComments = require('./index')

test('acorn-extract-comments:', function () {
  test('should throw TypeError if not string given', function (done) {
    function fixture () {
      acornExtractComments()
    }

    test.throws(fixture, TypeError)
    test.throws(fixture, /acorn-extract-comments expect a string/)
    done()
  })
  test('should extract comments to `.comments` prop (without options)', function (done) {
    var input = fs.readFileSync('./fixture.js', 'utf8')
    var actual = acornExtractComments(input)

    test.equal(typeof actual, 'object')
    test.ok(!actual.ast)
    test.ok(Array.isArray(actual.comments))
    done()
  })
  test('should pass AST to `.ast` prop (when `opts.ast:true`)', function (done) {
    var input = fs.readFileSync('./fixture.js', 'utf8')
    var actual = acornExtractComments(input, {ast: true})

    test.equal(typeof actual, 'object')
    test.equal(typeof actual.ast, 'object')
    test.ok(Array.isArray(actual.comments))
    done()
  })
})
