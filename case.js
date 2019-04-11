// const Koa = require('./koa/application')
const Koa = require('koa')

let app = new Koa()
app.use(async (ctx, next) => {
  // console.log(ctx.req.url) // req原生的
  // console.log(ctx.request.req.url)// req原生的

  // console.log(ctx.request.url)
  // console.log(ctx.url)

  ctx.body = 'hello'
  await next()
})

app.use(async (ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  ctx.body = 'world'
})

app.listen(3000, function () {
  console.log('server start 3000')
})
