let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')
let EventEmitter = require('events')
let Stream = require('stream')

class Koa extends EventEmitter {
  constructor () {
    super()
    this.middlewares = []
    this.context = Object.create(context) // 防止用户直接修改context对象
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use (fn) {
    this.middlewares.push(fn)
  }
  // 此方法用来产生ctx上下文
  createContext (req, res) {
    let ctx = this.context
    // 自己封装的
    ctx.request = this.request
    ctx.response = this.response
    // 原生的 为了可以在自己的request属性上拿到req就把req挂载在了自己封装的对象上
    ctx.request.req = ctx.req = req
    ctx.response.res = ctx.res = res
    return ctx
  }
  compose (ctx, middlewares) {
    let i = -1 // 通过此变量 来控制用户是否多次调用了next方法

    let dispatch = index => { // index =0
      if (index <= i) return Promise.reject(new Error('multi called next()~~~~'))
      i = index // i = 0;
      if (index === middlewares.length) return // 达到最后一个中间件 在调用next方法无效
      let fn = middlewares[index]
      // 第一个中间执行的时候 调用了第二个中间件 要等待第二个中间件执行后 完成第一个中间件
      // 第一个中间件 调用next会触发下一个中间件执行
      return Promise.resolve(fn(ctx, () => dispatch(index + 1)))
    }
    return dispatch(0)
  }
  handleRequest (req, res) {
    let ctx = this.createContext(req, res) // 创建上下文
    res.statusCode = 404 // 预先定义一个404状态码
    // compose 函数 组合函数 n种的方式 reduce  function next()
    let p = this.compose(ctx, this.middlewares) // 组合后会产生一个新的promise，等待这个promise执行完成后 会取ctx.body 返回结果
    p.then(() => {
      let body = ctx.body
      if (body instanceof Stream) {
        res.setHeader('Content-Type', 'application/octet-stream')
        // 下载文件 文件的名字是xxx
        res.setHeader('Content-Disposition', `attachment; filename=${body.path}`)
        body.pipe(res)
      } else if (typeof body === 'object') {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      } else if (body) {
        res.end(body)
      } else {
        res.end(`Not Found`)
      }
    }).catch((err) => {
      this.emit('error', err)
    })
  }
  listen (...args) {
    // 创建一个http服务
    let server = http.createServer(this.handleRequest.bind(this))
    // 监听端口号 启动一个服务
    server.listen(...args)
  }
}
module.exports = Koa
