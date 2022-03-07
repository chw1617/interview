// let , const 
// 1、块级作用域 （之前解决块级作用域是利用闭包）重要！！！
// 2、不可以重复声明
// 3、不会挂载到window

var list = []
for (var i = 0; i < 3; i++) {
  list[i] = function () {
    console.log(i)
  }
}

list[0]()
list[1]()
list[2]()

//输出什么
//怎么才可以打印0 ，1，2 （立即执行函数，闭包|let）