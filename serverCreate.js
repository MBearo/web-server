const http = require('http')

http.createServer((req, res) => {
  res.end('111')
}).listen(3000)
