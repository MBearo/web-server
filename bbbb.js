const JSBI = require('jsbi')
const max = JSBI.BigInt(90071992547409912234)
console.log(String(max))
// → '9007199254740991'
const other = JSBI.BigInt('2')
const result = JSBI.add(max, other)
console.log(String(result))
// → '9007199254740993'
var a = ''
a.toString(90071992547409912234)
console.log(a)
