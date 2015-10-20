const jsonParse = require('middleware-json-parse')
const restify = require('restify')

// create a server, parse json and expose it to the rest of the application
const server = restify.createServer()
server.use((req, res, next) => jsonParse(req, 'body')(req, res, next))
server.listen()
