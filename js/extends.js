// 1、原型链继承: 
// function Person(){
//     this.name = ['person'] //缺点：引用类型属性被所有实例共享，不能向person 传递参数
// }
// Person.prototype.getName = function(){
//     console.log(this.name)
// }
// Person.prototype.mm = '14'

// function Child(){
//     this.age = 12
// }
// Child.prototype = new Person()
// Child.prototype.constructor = Child
// var c = new Child()
// var c1 = new Child()
// console.dir(c)
// c.name.push('cc')



// 2、借用继承
// function Person(){
//     this.name = ['cc','vv']
// }

// Person.prototype.getName = function(){
//     console.log(this.name)
// }

// function Child(){
//     // 优点：执行父函数，实现每一个实例化的对象的继承值都是新的
//     // 缺点：但是也是缺点每次都会执行一次
//     // 只能继承属性，方法不能继承
//     Person.call(this)
// }
// var c = new Child()
// c.name.push('rr')
// console.log(c)
// console.log(c.name)
// var c1 = new Child()
// console.log(c1.name)


// 3、组合继承 （原型链+借用）
// function Person(name){
//     this.name = name
// }
// Person.prototype.getName = function(){
//     console.log(this.name)
// }
// function Child(name,age){
//     Person.call(this,name)
//     this.age = age
// }
// Child.prototype = new Person()
// Child.prototype.constructor = Child
// let c = new Child('c',17)
// console.dir(c)
// c.getName()

// 4、原型式继承：缺点和原型链一样，包含引用类型的值会共享

// function create(o){   //Object.create()模拟实现
//     function F(){}
//     F.prototype = o
//     return new F()
// }

// var obj = {
//     age:16,
//     list:[1]
// }
// var obj1 = Object.create(obj)
// var obj2 = create(obj)


// 5、寄生继承,和借用一样每次创建对象都执行一遍
// function createObj(o){
//     var o = Object.create(o)
//     o.sayName = function(){}
//     return o
// }

// 6、寄生组合继承 直接 child.prototype --> person.prototype

function Person(name){
    this.name = name
}
Person.prototype.getName = function(){
    console.log(this.name)
}
function Child(age){
    this.age = age
}


function create(o){ //保持原型链
    function F(){}
    F.prototype = o
    return new F()
}
function proto(child,parent){
    var proto = create(parent)
    proto.constructor = child
    child.prototype = proto
}

proto(Child,Person)
let c = new Child(12)
console.log(c)
c.getName()