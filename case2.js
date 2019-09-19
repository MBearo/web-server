// const Koa = require('./koa/application')
const Koa = require('./koa5/application')

let app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'world'
})

app.listen(3000, function () {
  console.log('server start 3000')
})
