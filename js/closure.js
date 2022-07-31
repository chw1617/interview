// 闭包：本质上是作用域的的问题
// mdn:能够访问自由变量的函数就是闭包， 自由变量（不是函数内部的参数和局部变量）
// js 权威指南
// 理论上：所有的函数，在创建阶段就将上层的上下文的变量对象保存下来[[scopes]]，全局变量也是，因为他访问的全局变量就是访问自由变量，也就是最外层作用域
// 实践上：1、创建它的上下文已经被销毁了，但它还存在（内部函数被返回），2、能够访问自由变量



// 用途：1、访问函数内部的变量，2、让变量的值保存在内存中 （函数内部和外部连接的桥梁）
// 缺点：内存泄露

var name = "The Window";

var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};

alert(object.getNameFunc()());


//防抖节流
//computed
//防抖:等待1s,有触发就清楚,在计算时间 (scroll) 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(fn,await,immedat){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer) //有就清楚
        }
        if(immedat){
           let call = !timer
           timer =  setTimeout(()=>{
                fn.apply(this,arguments)
            })
            if(call){
               fn.apply(this,arguments)
            }
        }else{
            timer =  setTimeout(()=>{
                fn.apply(this,arguments)
            })
        }
    }
}

//节流 固定时间后就执行一个函数 input 高频事件触发，但在n秒内只会执行一次 
function thorlle(fn,await){
    let last = null
    return function(){
        let now = Date.now()
        if(now - last > await){
            fn.apply(this,arguments)
            last = now
        }
    }
}

function thorlle(fn,await){
    let timer = null
    return function(){
        timer = setTimeout(() => {
            fn.apply(this,arguments)
        }, await);
    }
}

