
// this.x = 10

// function a () {
//   console.log(this)
//   b()
// }
// function b () {
//   console.log(this)
//   c()
// }
// function c () {
//   console.log(this)
// }
// a.x = 11
// b.x = 12
// c.x = 13
// a()

const http = require('http')

let xxx = http.createServer(handleRequest)
xxx.listen(3000)

function handleRequest (req, res) {
  console.log(this)
  console.log(req)
  res.end('111')
}
