const http = require('http')

// ***************************** 以下为新增代码 *****************************
const Stream = require('stream')
// ***************************** 以上为新增代码 *****************************

const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
  constructor () {
    // 存储中间件
    this.middlewares = []

    // 为了防止通过 this 修改属性而导致影响原引入文件的导出对象，做一个继承
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use (fn) {
    // 将传给 use 的函数存入数组中
    this.middlewares.push(fn)
  }
  createContext (req, res) {
    // 或取定义的上下文
    let ctx = this.context

    // 增加 request 和 response
    ctx.request = this.request
    ctx.response = this.response

    // 让 ctx、request、response 都具有原生的 req 和 res
    ctx.req = ctx.request.req = ctx.response.req = req
    ctx.res = ctx.response.res = ctx.request.res = res

    // 返回上下文对象
    return ctx
  }
  compose (ctx, middles) {
    // 创建一个递归函数，参数为存储中间件的索引，从 0 开始
    function dispatch (index) {
      // 在所有中间件执行之后给 compose 返回一个 Promise（兼容一个中间件都没写的情况）
      if (index === middles.length) return Promise.resolve()

      // 取出第 index 个中间件函数
      const route = middles[index]

      // 为了兼容中间件传入的函数不是 async，一定要包装成一个 Promise
      return Promise.resolve(route(ctx, () => dispatch(++index)))
    }
    return dispatch(0) // 默认执行一次
  }
  handleRequest (req, res) {
    console.log(this)
    // 创建 ctx 上下文对象
    let ctx = this.createContext(req, res)

    // ***************************** 以下为修改代码 *****************************
    // 设置默认状态码（Koa 规定），必须在调用中间件之前
    ctx.status = 404

    // 执行 compose 将中间件组合在一起
    this.compose(ctx, this.middlewares).then(() => {
      // 获取最后 body 的值
      let body = ctx.body

      // 检测 ctx.body 的类型，并使用对应的方式将值响应给浏览器
      if (Buffer.isBuffer(body) || typeof body === 'string') {
        // 处理 Buffer 类型的数据
        res.setHeader('Content-Type', 'text/plain;charset=utf8')
        res.end(body)
      } else if (typeof body === 'object') {
        // 处理对象类型
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(body))
      } else if (body instanceof Stream) {
        // 处理流类型的数据
        body.pipe(res)
      } else {
        res.end('Not Found')
      }
    })
    // ***************************** 以上为修改代码 *****************************
  }
  listen (...args) {
    // 创建服务
    let server = http.createServer(this.handleRequest.bind(this))

    // 启动服务
    server.listen(...args)
  }
}

module.exports = Koa
