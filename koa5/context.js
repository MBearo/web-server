const proto = {}

// 将传入对象属性代理给 ctx
function defineGetter (property, key) {
  proto.__defineGetter__(key, function () {
    return this[property][key]
  })
}

// 设置 ctx 值时直接操作传入对象的属性
function defineSetter (property, key) {
  proto.__defineSetter__(key, function (val) {
    this[property][key] = val
  })
}

// 将 request 的 url 和 path 代理给 ctx
defineGetter('request', 'url')
defineGetter('request', 'path')

// 将 response 的 body 和 status 代理给 ctx
defineGetter('response', 'body')
defineSetter('response', 'body')
defineGetter('response', 'status')
defineSetter('response', 'status')

module.exports = proto
