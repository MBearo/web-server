const http = require('http')

http.createServer((req) => {
  req.end('111')
}).listen(3001)
