const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
  constructor () {
    this.middleware = undefined
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use (fn) {
    this.middleware.push(fn)
    return this
  }
  createContext (req, res) {
    let ctx = this.context
    ctx.request = this.request
    ctx.response = this.response
    ctx.request.req = ctx.req = req
    ctx.response.res = ctx.res = res
    return ctx
  }
  handleRequest (req, res) {
    // 创建上下文
    let ctx = this.createContext(req, res)
    this.middleware.forEach(fn => {
      fn(ctx)
    })
  }
  listen (...args) {
    // 不写bind的话this指向server实例
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}
module.exports = Koa
