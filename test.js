/*!
 * acorn-extract-comments <https://github.com/tunnckoCore/acorn-extract-comments>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var acornExtractComments = require('./index')

test('should throw TypeError if not a string', function (done) {
  function fixture () {
    acornExtractComments(123456)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `input` to be a string/)
  done()
})

test('should get empty array if empty string given', function (done) {
  var comments = acornExtractComments('')
  test.deepEqual(comments, [])
  done()
})

test('should get empty array if not comments found', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments.line(input)

  test.strictEqual(comments.length, 0)
  test.strictEqual(Array.isArray(comments), true)
  done()
})

test('should get all comments, including ignored', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments(input)

  test.strictEqual(comments.length, 6)
  done()
})

test('should get all comments, but not including `ignored` (preserve: true)', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments(input, {preserve: true})

  test.strictEqual(comments.length, 5)
  done()
})

test('should get all comments, but not including `ignored` (preserve: ignoreFunction)', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments(input, {preserve: function ignore (val) {
    // comments that starts like `/*!` or `/** ~` or `/** ~~`
    // are ignored, so not in they are not in `comments` result
    return val.charCodeAt(0) === 33 || (val.charCodeAt(2) === 126 || val.charCodeAt(3) === 126)
  }})

  test.strictEqual(comments.length, 4)
  done()
})

test('should get only block comments with `.block` method', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments.block(input)

  test.strictEqual(comments.ast, undefined)
  test.strictEqual(comments.length, 6)
  done()
})

test('should get only line comments with `.line` method', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')

  var comments = acornExtractComments.line(input)
  test.strictEqual(comments.length, 0)
  done()
})
