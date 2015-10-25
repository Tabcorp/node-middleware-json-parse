const httpError = require('http-custom-errors')
const parseJson = require('safe-json-parse')
const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const concat = require('concat-stream')
const assert = require('assert')
const noop = require('noop2')

module.exports = nodeMiddlewareJsonParse

// JSON parsing middleware
// (obj, str, fn?) -> (obj, obj, fn?) -> null
function nodeMiddlewareJsonParse (ctx, propName, fmtErr) {
  fmtErr = fmtErr || dftFmt

  assert.equal(typeof ctx, 'object', 'ctx is object')
  assert.equal(typeof propName, 'string', 'prop is string')
  assert.equal(typeof fmtErr, 'function', 'fmtErr is function')

  return function (req, res, next) {
    next = next || noop

    assert.ok(isReq(req), 'is req')
    assert.ok(isRes(res), 'is res')
    assert.equal(typeof next, 'function', 'next is function')

    if (req.headers['content-type'] !== 'application/json') return next()

    req.pipe(concat({ string: true }, function (str) {
      parseJson(str, function (err, json) {
        if (err) return next(fmtErr())
        ctx[propName] = json
        next()
      })
    }))
  }
}

// default JSON format fn
// null -> obj
function dftFmt () {
  return new httpError.BadRequestError('Invalid JSON')
}
