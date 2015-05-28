/*!
 * acorn-extract-comments <https://github.com/tunnckoCore/acorn-extract-comments>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var acorn = require('acorn')

module.exports = function acornExtractComments (input, opts) {
  if (typeof input !== 'string') {
    throw new TypeError('acorn-extract-comments expect a string')
  }

  opts = typeof opts === 'object' ? opts : {}
  opts.ecmaVersion = opts.ecmaVersion || 6
  opts.locations = true

  var comments = opts.onComment = []
  var corns = acorn.parse(input, opts)
  var lines = input.split('\n')
  var result = {}

  comments = comments.filter(function (comment, i) {
    if (comment.type === 'Block' && comment.value.charAt(0) !== '!') {
      var commentEnd = comment.loc.end.line
      var codeStart = lines[commentEnd]

      if (codeStart.indexOf('  ') === 0 && !opts.nested) {
        return null
      }

      if (!codeStart.trim()) {
        commentEnd = commentEnd + 1
        codeStart = lines[commentEnd]
      }

      comment.api = comment.value.indexOf('@api') !== -1
      comment.after = codeStart
      return comment
    }
  })

  if (opts.ast) {
    result.ast = corns
  }
  result.comments = comments

  return result
}
