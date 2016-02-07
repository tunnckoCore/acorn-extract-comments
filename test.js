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
  done()
})

test('should get all comments, including ignored', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments(input)

  test.strictEqual(comments.length, 6)
  done()
})

test('should get all comments, but not including `ignored`', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments(input, {preserve: true})

  test.strictEqual(comments.length, 5)
  done()
})

test('should get only block with `.block` method', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')
  var comments = acornExtractComments.block(input)

  test.strictEqual(comments.length, 6)
  done()
})

test('should get only line with `.line` method', function (done) {
  var input = fs.readFileSync('./index.js', 'utf8')

  var comments = acornExtractComments.line(input)
  test.strictEqual(comments.length, 0)
  done()
})
