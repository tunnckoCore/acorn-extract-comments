# [acorn-extract-comments][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Extract JavaScript code comments from a string, using `acorn`.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i acorn-extract-comments --save
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
const extract = require('acorn-extract-comments')
```


### [acornExtractComments](index.js#L42)
> Extract all code comments, including block/line and also these that are marked as "ignored" like (`//!` and `/*!`)

**Params**

* `<input>` **{String}**: string from which to get comments    
* `[opts]` **{Object}**: optional options, passed to `acorn`  
  - `ast` **{Boolean}**: if `true` the ast is added to the resulting array
  - `line` **{Boolean}**: if `false` get only block comments, default `true`
  - `block` **{Boolean}**: if `false` get line comments, default `true`
  - `preserve` **{Boolean|Function}**: if `true` will get only comments that are **not** ignored
  - `locations` **{Boolean}**: if `true` result will include `acorn` location object
  - `ecmaVersion` **{Number}**: defaults to `6`, acorn parsing version
* `returns` **{Array}**: can have `.ast` property if `opts.ast: true`  

**Example**

```js
const fs = require('fs')
const extract = require('acorn-extract-comments')

const str = fs.readFileSync('./index.js', 'utf8')
const comments = extract(str, {})
// => ['array', 'of', 'all', 'code', 'comments']
```

### [.line](index.js#L70)
> Extract only line comments.

**Params**

* `<input>` **{String}**: string from which to get comments    
* `[opts]` **{Object}**: optional options, passed to `acorn`    
* `returns` **{Array}**: can have `.ast` property if `opts.ast: true`  

**Example**

```js
const comments = extract(str, {block: false})
// => ['array', 'of', 'line', 'comments']
```

or through method

```js
const comments = extract.line(str)
// => ['all', 'line', 'comments']
```

### [.block](index.js#L98)
> Extract only block comments.

**Params**

* `<input>` **{String}**: string from which to get comments    
* `[opts]` **{Object}**: optional options, passed to `acorn`    
* `returns` **{Array}**: can have `.ast` property if `opts.ast: true`  

**Examples**

```js
const comments = extract(str, {line: false})
// => ['array', 'of', 'block', 'comments']
```

or through method

```js
const comments = extract.block(str)
// => ['array', 'of', 'block', 'comments']
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/acorn-extract-comments/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/acorn-extract-comments
[npmjs-img]: https://img.shields.io/npm/v/acorn-extract-comments.svg?label=acorn-extract-comments

[license-url]: https://github.com/tunnckoCore/acorn-extract-comments/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/acorn-extract-comments
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/acorn-extract-comments.svg

[travis-url]: https://travis-ci.org/tunnckoCore/acorn-extract-comments
[travis-img]: https://img.shields.io/travis/tunnckoCore/acorn-extract-comments.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/acorn-extract-comments
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/acorn-extract-comments.svg

[david-url]: https://david-dm.org/tunnckoCore/acorn-extract-comments
[david-img]: https://img.shields.io/david/tunnckoCore/acorn-extract-comments.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg