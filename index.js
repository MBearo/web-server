#!/usr/bin/env node
const path = require('path')
const net = require('net')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
// const order = ['-port', '-path', 'list']
// 获取命令的参数
const args = process.argv.slice(2)
console.log(args)
console.log(`pid is ${process.pid}`)

let staticPath = '.'
let port = '3000'

checkArgument().then(_ => {
  app.use(serve(path.resolve(staticPath)))

  app.listen(port)

  console.log(`web-server start on http://localhost:${port}`)
})

async function checkArgument () {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-port') {
      if (args[i + 1]) {
        console.log(args[i + 1])
        await portIsOccupied(args[i + 1])
        port = args[i + 1]
      } else {
        // throw new Error("can't find '-port' arguments !")
      }
    } else if (args[i] === '-path') {
      if (args[i + 1]) {
        staticPath = args[i + 1]
      }
    }
  }
}
// 检测端口是否被占用
function portIsOccupied (port) {
  return new Promise((resolve, reject) => {
    // 创建服务并监听该端口
    let server = net.createServer().listen(port)

    server.on('listening', _ => { // 执行这块代码说明端口未被占用
      server.close() // 关闭服务
      resolve()
    })

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        reject(new Error(`The port '${port}' is occupied, please change other port.`))
        throw new Error(`The port '${port}' is occupied, please change other port.`)
      }
    })
  })
}
