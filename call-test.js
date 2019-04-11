var a = {
  b: 1
}
function c (d, e) {
  console.log(d)
  console.log(e)
  console.log(this.b)
}

Function.prototype.call2 = function (value) {
  var value = value || window
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  value.fn = this
  eval('value.fn(' + args + ')')
  delete value.fn
}

c.call2(a, 'dd', 'ee')
