/*!
 * acorn-extract-comments <https://github.com/tunnckoCore/acorn-extract-comments>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var acorn = require('acorn')
var filter = require('arr-filter')
var extend = require('extend-shallow')
var stripShebang = require('strip-shebang')

/**
 * > Extract all code comments, including block/line and
 * also these that are marked as "ignored" like (`//!` and `/*!`)
 *
 * **Example**
 *
 * ```js
 * const fs = require('fs')
 * const extract = require('acorn-extract-comments')
 *
 * const str = fs.readFileSync('./index.js', 'utf8')
 * const comments = extract(str, {})
 * // => ['array', 'of', 'all', 'code', 'comments']
 * ```
 *
 * @name  acornExtractComments
 * @param  {String} `<input>` string from which to get comments
 * @param  {Object} `opts` optional options, passed to `acorn`
 *   @option {Boolean} [opts] `ast` if `true` the ast is added to the resulting array
 *   @option {Boolean} [opts] `line` if `false` get only block comments, default `true`
 *   @option {Boolean} [opts] `block` if `false` get line comments, default `true`
 *   @option {Function} [opts] `ignore` check function, default check comment starts with `!`
 *   @option {Boolean} [opts] `preserve` if `true` will get only comments that are **not** ignored
 *   @option {Boolean} [opts] `locations` if `true` result will include `acorn` location object
 *   @option {Number} [opts] `ecmaVersion` defaults to `6`, acorn parsing version
 * @return {Array} can have `.ast` property if `opts.ast: true`
 * @api public
 */
exports = module.exports = function extractAllComments (input, opts) {
  opts = extend({block: true, line: true}, opts)
  return acornExtractComments(input, opts)
}

/**
 * > Extract only line comments.
 *
 * **Example**
 *
 * ```js
 * const comments = extract(str, {block: false})
 * // => ['array', 'of', 'line', 'comments']
 * ```
 *
 * **Example**
 *
 * ```js
 * const comments = extract.line(str)
 * // => ['all', 'line', 'comments']
 * ```
 *
 * @name  .line
 * @param  {String} `<input>` string from which to get comments
 * @param  {Object} `[opts]` optional options, passed to `acorn`
 * @return {Array} can have `.ast` property if `opts.ast: true`
 * @api public
 */
exports.line = function extractLineComments (input, opts) {
  opts = extend({line: true}, opts)
  return acornExtractComments(input, opts)
}

/**
 * > Extract only block comments.
 *
 * **Example**
 *
 * ```js
 * const comments = extract(str, {line: false})
 * // => ['array', 'of', 'block', 'comments']
 * ```
 *
 * **Example**
 *
 * ```js
 * const comments = extract.block(str)
 * // => ['array', 'of', 'block', 'comments']
 * ```
 *
 * @name  .block
 * @param  {String} `<input>` string from which to get comments
 * @param  {Object} `[opts]` optional options, passed to `acorn`
 * @return {Array} can have `.ast` property if `opts.ast: true`
 * @api public
 */
exports.block = function extractBlockComments (input, opts) {
  opts = extend({block: true}, opts)
  return acornExtractComments(input, opts)
}

/**
 * > Core logic to extract comments
 *
 * @param  {String} `<input>` string from which to get comments
 * @param  {Object} `[opts]` optional options, passed to `acorn`
 * @return {Array} can have `.ast` property if `opts.ast: true`
 * @api private
 */
function acornExtractComments (input, opts) {
  if (typeof input !== 'string') {
    throw new TypeError('acorn-extract-comments expect `input` to be a string')
  }
  if (!input.length) return []

  opts = extend({
    ast: false,
    line: false,
    block: false,
    preserve: false,
    locations: false,
    ecmaVersion: 6,
    ignore: defaultIsIgnore
  }, opts)

  var comments = opts.onComment = []
  var ast = acorn.parse(stripShebang(input), opts)

  if (!comments.length) return []

  comments = filter(comments, function (comment) {
    var line = (opts.line && comment.type === 'Line') || false
    var block = (opts.block && comment.type === 'Block') || false
    var ignore = (opts.preserve && opts.ignore(comment.value)) || false

    if (!ignore && line) return true
    if (!ignore && block) return true
    return false
  })

  comments.ast = opts.ast && ast || undefined
  return comments
}

/**
 * > Default ignore/preserve check function
 *
 * @param  {String} `val`
 * @return {String}
 * @api private
 */
function defaultIsIgnore (val) {
  return val.charCodeAt(0) === 33 || val.charCodeAt(1) === 33
}
