// 原型prototype、实例instance、构造函数constructor

//1、每一个实例化的对象都有一个与之关联的原型，实例化的对象通过原型继承原型上的方法和属性，可以通过__proto__属性来查找，会指向构造函数的prototype
//2、每一个函数都有一个prototype属性,保存自己构造函数constructor属性
//3、函数的也是被Function实例化的，所以函数也是一个对象，foo.__proto__ === Function.prototype、 
//4、需要注意的地方
// 顶端 Function Object ，函数都有__proto__ 和 prototype
Function.__proto__ ===   Function.prototype  //重要
Function.__proto__.__proto__ == Object.prototype
Function.prototype.__proto__ == Object.prototype

Function.__proto__ == Object.__proto__

Object.__proto__ == Function.prototype
Object.prototype.__proto__ == null  ///重要


//内置构造函数
Object.__proto__   === Function.prototype
Array.__proto__    === Function.prototype
// 




