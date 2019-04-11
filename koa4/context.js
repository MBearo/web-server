let ctx = {}
// 公共代理的方法
function defineGetter (property, key) {
  // 取值时相当于去 property上面取值
  ctx.__defineGetter__(key, function () {
    return this[property][key]
  })
}

// vue vm.$data = vm
function deineSetter (property, key) {
  ctx.__defineSetter__(key, function (value) {
    this[property][key] = value
  })
}
// ctx.url == ctx.request.url
defineGetter('request', 'url')
defineGetter('response', 'body')

deineSetter('response', 'body')

module.exports = ctx
// 上下文上的url
// vue 代理
// let obj = {
//     a:100
// }
// // obj.a
// let newObj = {}
// newObj.__defineGetter__('a',function(){
//     return obj['a'];
// })
// console.log(newObj.a);
