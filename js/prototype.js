// es5 prototype === extend 
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}

function Work (name, age, work) {
  Person.call(this, name, age)
  this.work = work
}

let work = new Work('cc', 18, 'fe')
console.dir(work)
Work.prototype = new Person()
Work.prototype.constructor = work
let w1 = new Work('c1', 16, 'ccc')
console.dir(w1)

// es6


// 继承

