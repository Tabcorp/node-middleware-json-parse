const jsonParse = require('middleware-json-parse')
const httpMiddleware = require('http-middleware')
const http = require('http')

// create a server, parse json and respond if it was successful
http.createServer(function (req, res) {
  const context = {}

  const middleware = [ jsonParse(context, 'body') ]

  httpMiddleware(req, res, middleware, function (err) {
    res.statusCode = err ? 400 : 200
    const body = err || { message: 'succes!' }
    res.end(JSON.stringify(body))
  })
}).listen()
