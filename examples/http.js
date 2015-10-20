const jsonParse = require('middleware-json-parse')
const http = require('http')

// create a server, parse json and respond if it was successful
http.createServer(function (req, res) {
  const context = {}
  jsonParse(context, 'body')(req, res, err => {
    if (err) res.statusCode = 400
    const body = err || { message: 'succes!' }
    res.end(JSON.stringify(body))
  })
}).listen()
