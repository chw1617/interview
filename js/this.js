
// 1.默认绑定 ，严格模式undefined 和非严格模式下 window,一般发生在回调函数中

// 2.隐式绑定 函数是由于某个对象执行，xx.fn() 就会隐式绑定到xx, 多个对象嵌套的时候只关注最后一层 （谁调用函数this就指向谁）
// 如果重新赋值给其他变量就会丢失绑定 let fn = obj.foo  || 回调函数中也会丢失

//3.显示绑定 call,apply,bind 强制绑定到了该对象上，
//参数为null,undefined的时候就将this指向全局，采用默认绑定
// fn1.call(obj,arg)
// 
Function.prototype._call = function () {
    // console.log('this', this,arguments)
    // target.fn = this
    let traget = arguments[0]
    traget.fn = this
    traget.fn()
    delete traget.fn
    return traget
}

function test(a) {
    console.log('tt', a)
}

var obj = {
    name: 'cc'
}
test._call(obj, 12)


//4.new 绑定到实例化的对象上
//创建一个空对象
//取出构造方法，建立[[原型]]连接
//执行构造方法，将构造函数中的this指向空对象,添加属性和方法到this 的引用对象上
//默认返回空对象
// function _new () {
//   let target = {}
//   // let [constructor, ...arg] = [...arguments]
//   let constructor = Array.prototype.shift.call(arguments)
//   target._proto_ = constructor.prototype
//   let result = constructor.apply(target, arguments)
//   if (result && typeof result === 'object' || typeof result === 'function') {
//     return result
//   }
//   return target
// }


// function Test (a) {
//   this.a = a
// }

// let t = _new(Test, 'cc')

// console.log(t)


//5.箭头函数，定义的时候就继承到上一层作用域this，argument


//优先级 5 > 4 > 3 > 2 > 1

//this bind,call,apply || new
const obj = {
    b: 12,
    foo: function () {
        console.log('log', this.b)
    }
}
function b(fn) {
    fn()
}
b(obj.foo)

