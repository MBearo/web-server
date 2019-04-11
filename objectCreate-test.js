var a = { x: 1 }
var b = a
b.y = 10
console.log(a, b)
var c = Object.create(a)
c.z = 100
console.log(a)
for (const key in c) {
  console.log(key + ':' + c[key])
}
