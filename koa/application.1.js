const http = require('http')
class Koa {
  constructor () {
    this.middleware = undefined
  }
  use (fn) {
    this.middleware = fn
  }
  handleRequest (req, res) {
    this.middleware()
    console.log(this)
  }
  listen (...args) {
    console.log(...args)
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}
module.exports = Koa
