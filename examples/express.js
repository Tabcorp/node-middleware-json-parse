const jsonParse = require('middleware-json-parse')
const express = require('express')

// create a server, parse json and expose it to the rest of the application
const app = express()
app.use((req, res, next) => jsonParse(req, 'body')(req, res, next))
app.listen(3000)
