# middleware-json-parse [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

JSON parsing middleware.

__Features:__
- fast
- works with any framework
- flexible
- safe (e.g. will never crash your server)

## Installation
```sh
$ npm install middleware-json-parse
```

## Usage
```js
const parseJson = require('middleware-json-parse')
const middleware = require('http-middleware')
const http = require('http')

http.createServer((req, res) => {
  const mw = [ parseJson(req, 'body') ]
  middleware(req, res, mw, (err) => {
    res.statusCode = err ? 500 : 200
    console.log('body', req.body)
    res.end()
  })
}).listen()
```

## API
### parser = parseJson(ctx, propName, errFn?)
Create safe json parsing middleware. Requires a `context` object on which to
set a `propName` containing the body value (in express: `req, 'body'`).
Takes an optional function as the third argument to format errors that are
passed to `next`.  Errors are by default formatted as `new Error({ message:
'Invalid JSON' })`.

### parser(req, res, next?)
Safely parse JSON data from `req`, mount it on the `context` as `propName`,
and call `next` when done. Only parses content if the
`Content-Type=application/json` HTTP header is set.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/middleware-json-parse.svg?style=flat-square
[3]: https://npmjs.org/package/middleware-json-parse
[4]: https://img.shields.io/travis/TabDigital/node-middleware-json-parse/master.svg?style=flat-square
[5]: https://travis-ci.org/TabDigital/node-middleware-json-parse
[6]: https://img.shields.io/codecov/c/github/TabDigital/node-middleware-json-parse/master.svg?style=flat-square
[7]: https://codecov.io/github/TabDigital/node-middleware-json-parse
[8]: http://img.shields.io/npm/dm/middleware-json-parse.svg?style=flat-square
[9]: https://npmjs.org/package/middleware-json-parse
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
