const http = require('http')
class Koa {
  constructor () {
    this.middlewares = []
  }
  use (fn) {
    this.middlewares.push(fn)
  }
  handleRequest (req, res) {
    // this?
    res.end('111111')
  }
  listen (...args) {
    let server = http.createServer(this.handleRequest)
    server.listen(...args)
  }
}
module.exports = Koa
