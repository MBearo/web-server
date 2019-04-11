// function Person (name) {
//   this.name = name
//   this.realName = function () {
//     console.log(this.name + 10)
//   }
// }
// Person.prototype.oldName = function () {
//   console.log(this.name - 10)
// }

class Person {
  constructor (name) {
    this.name = name
    this.realName = function () {
      console.log(this.name + 10)
    }
  }
  oldName () {
    console.log(this.name - 10)
    this.newName()
  }
  newName () {
    console.log(this.name + 3)
  }
}

var xiaoming = new Person(30)
console.log(xiaoming)
xiaoming.realName()
xiaoming.oldName()
