const url = require('url')

// 给 url 和 path 添加 getter
const request = {
  get url () {
    return this.req.url
  },
  get path () {
    return url.URL(this.req.url).pathname
  }
}

module.exports = request
