// 代码就是玩的，代码灵活运用，运用能力

// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// } //333

// -------------------------------

// for (let i = 0; i < 3; i++) {
//     console.log(i)
// }//012

// for (let i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// }//012

// for (let i = 0; i < 3; i++) {
//   (function(i){
//     setTimeout(function () {
//       console.log(i)
//     }, 1000)
//   })(i)
// }//012


// for (let i = 0; i < 3; i++) {
//   setTimeout((
//     function (i) {
//       return function () {
//         console.log(i)
//       }
//     }
//   )(i),1000)
// }
// //012

// for (var i = 0; i < 3; i++) {
//   var j = 0
//   setTimeout(function () {
//     console.log(j++)
//   }, 1000)
// } //012


// var arr = []
// for (var i = 0; i < 3; i++) {
//   arr.push(i)
//   setTimeout(function () {
//     console.log(arr.shift())
//   }, 1000)
// } //012


var data = [];

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
       console.log(arguments.callee.i) 
    }).i = i;
}

data[0]();
data[1]();
data[2]();



// var obj = {a:12}
// var obj1 = obj
// console.log(obj)
// console.log(obj1)

// obj1.c = 13 //引用地址的副本，存在栈中， 同时指向堆中的值
// obj1 = 12 //又重新指向新的值了
// console.log(obj1,obj)
// 'use strict'
function foo(arg){
    arg = 13
    console.log(arguments[0]) //非严格模式下，传入的参数和argument会共享
}
foo(12) // foo.length 是实际参数个数
