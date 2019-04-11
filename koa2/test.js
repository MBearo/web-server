const Koa = require('./application')

const app = new Koa() // koa是个类，new一个对象app
// 每个中间件都会获得一个上下文环境
const main = ctx => {
  ctx.body = 'hello world'
}
app.use(main) // 中间件使用
app.listen(3001) // 监听3000端口
