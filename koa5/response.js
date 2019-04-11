// 给 body 和 status 添加 getter 和 setter
const response = {
  get body () {
    return this._body
  },
  set body (val) {
    // 只要给 body 赋值就代表响应成功
    this.status = 200
    this._body = val
  },
  get status () {
    return this.res.statusCode
  },
  set status (val) {
    this.res.statusCode = val
  }
}

module.exports = response
