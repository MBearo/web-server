// 事件触发与事件监听功能的封装
const Emitter = require('events') // 从事件模块events引入Emitter
const http = require('http') // 引入http模块
const debug = require('debug') // 引入debug模块

// 向外暴露这个类
module.exports = class Application extends Emitter {
  // 继承于Emitter类，所以子类必须声明constructor类，来自es6语法
  constructor () {
    super()
    // 放中间件的数组
    this.middleware = []
  }
  // 启用中间件  中间件就是函数
  use (fn) {
    console.log(fn)
    // 把fn（函数）这个参数放入中间件数组
    this.middleware.push(fn)
    // chain链式调用
    return this
  }
  // listen函数实现
  // 运用...reset，es6语法。里面参数有端口号，回调函数等等
  listen (...args) {
    // 开始监听
    debug('listen')
    // 将http的server封装一下
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
  // 创建服务server回调函数的实现。
  callback () {
    const handleRequest = (req, res) => {
      res.end('hello world')
    }
    return handleRequest
  }
}
