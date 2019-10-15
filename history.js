
const fs = require('fs')
module.exports = (path) => {
  console.log(path)
  return async (ctx, next) => {
    const isFile = ctx.url.split('?')[0].split('/').slice(-1)[0].split('.').length > 1
    if (isFile) {
      await next()
    } else {
      ctx.set('Content-Type', 'text/html;charset=utf-8')
      ctx.body = fs.createReadStream(path + '/index.html')
    }
  }
}
