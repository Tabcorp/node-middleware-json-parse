const getPort = require('get-server-port')
const request = require('nets')
const http = require('http')
const test = require('tape')
const parseJson = require('./')

test('should assert input types', function (t) {
  t.plan(6)
  t.throws(parseJson.bind(null), /object/)
  t.throws(parseJson.bind(null, {}), /string/)
  t.throws(parseJson.bind(null, {}, 'body', {}), /function/)

  const server = http.createServer(function (req, res) {
    const parse = parseJson({}, 'body')
    t.throws(parse.bind(null), 'req')
    t.throws(parse.bind(null), 'res')
    res.end()
  }).listen()

  request('http://localhost:' + getPort(server), function (err, res, body) {
    t.ifError(err, 'no err')
    server.close()
  })
})

test('should parse json', function (t) {
  t.plan(3)

  const server = http.createServer(function (req, res) {
    const ctx = {}
    const parse = parseJson(ctx, 'body')
    parse(req, res, function (err) {
      t.ifError(err)
      t.deepEqual(ctx, {
        body: { foo: 'bar' }
      })
    })
    res.end()
  }).listen()

  const opts = {
    url: 'http://localhost:' + getPort(server),
    body: JSON.stringify({ foo: 'bar' }),
    headers: { 'Content-Type': 'application/json' }
  }
  request(opts, function (err, res, body) {
    t.ifError(err, 'no err')
    server.close()
  })
})

test('should return an err on malformed json', function (t) {
  t.plan(3)

  const server = http.createServer(function (req, res) {
    const ctx = {}
    const parse = parseJson(ctx, 'body')
    parse(req, res, function (err) {
      t.deepEqual(err, {
        code: 400,
        status: 'Bad Request'
      })
      t.deepEqual(ctx, {})
    })
    res.end()
  }).listen()

  const opts = {
    url: 'http://localhost:' + getPort(server),
    body: 'lol, what json?',
    headers: { 'Content-Type': 'application/json' }
  }
  request(opts, function (err, res, body) {
    t.ifError(err, 'no err')
    server.close()
  })
})

test('should accept a custom error formatter', function (t) {
  t.plan(3)

  const server = http.createServer(function (req, res) {
    const ctx = {}
    const parse = parseJson(ctx, 'body', customFmt)
    parse(req, res, function (err) {
      t.deepEqual(err, { message: 'custom err' })
      t.deepEqual(ctx, {})
    })
    res.end()

    function customFmt () {
      return { message: 'custom err' }
    }
  }).listen()

  const opts = {
    url: 'http://localhost:' + getPort(server),
    body: 'lol, what json?',
    headers: { 'Content-Type': 'application/json' }
  }
  request(opts, function (err, res, body) {
    t.ifError(err, 'no err')
    server.close()
  })
})
