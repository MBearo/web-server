#!/usr/bin/env node
const path = require('path')
const net = require('net')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
// const order = ['-port', '-path', 'list']

// Get parameters
const args = process.argv.slice(2)
// console.log(args)
// console.log(`pid is ${process.pid}`)

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
        throw new Error("can't find '-port' parameters !")
      }
    } else if (args[i] === '-path') {
      if (args[i + 1]) {
        staticPath = args[i + 1]
      }
    }
  }
}

// Check if the port is occupied
function portIsOccupied (port) {
  return new Promise((resolve, reject) => {
    // Create server and listen this port
    let server = net.createServer().listen(port)
    server.on('listening', _ => { // Executing this code indicates that the port is not occupied
      server.close() // close server
      resolve()
    })
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') { // The port is occupied
        reject(new Error(`The port '${port}' is occupied, please change other port.`))
        throw new Error(`The port '${port}' is occupied, please change other port.`)
      }
    })
  })
}
