const Koa = require('./koa4/application')

let app = new Koa()
app.use(async (ctx, next) => {
  console.log(ctx.request.url)
  ctx.body = '2324'
  await next()
})

app.use(async (ctx, next) => {
  console.log(ctx.request.url)
  await makePromise(ctx)
})

function makePromise (ctx) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      ctx.body = '1111'
      resolve()
    }, 1000)
  })
}

app.listen(3000, function () {
  console.log('server start 3000')
})
console.log(app)
