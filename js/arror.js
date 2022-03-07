// 箭头函数 1.仅仅是简写 2.没有this,arguments
// this,arguments 只会从自己定义的时候作用域的上一层继承this（在定义的时候就确定了）
// this 是动态变化的 重要！！！
// 而函数作用域确是声明的时候已经明确了 重要!!!


// 节流 每隔一段时间，只执行一次函数 throttle
// 防抖 事件触发n s 后执行一次事件，如果ns 内再次触发，则重新计时
// function debounce (fn, await) {
//   let timer = null
//   return function () {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       console.log(this)
//     })
//   }
// }




//test
var number = 5;
var obj = {
  number: 3,
  fn1: (function () { //立即执行函数
    var number = 3
    this.number *= 2; // 10
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number); // 9
    }
  })()
}

var fn1 = obj.fn1;
fn1.call(null); // 10 , 9 this指向
obj.fn1(); // 3 27 闭包 
console.log(window.number); // 40

var number = 5;
var obj = {
  number: 3,
  fn1: (function () { //立即执行函数
    var number = 3
    this.number *= 2; // 10
    return () => {  // win 箭头函数
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number); // 9
    }
  })()
}

var fn1 = obj.fn1;
fn1.call(null); // 10 , 9 this指向
obj.fn1(); // 20 27 闭包 
console.log(window.number); // 40