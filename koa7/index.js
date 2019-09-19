const Koa = require('./application')

const app = new Koa()

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

app.listen(3000, function () {
  console.log('linsten 3000')
})
