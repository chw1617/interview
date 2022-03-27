//js 不是一行一行执行的，而是一段一段分析执行，一段代码执行的时候，会有编译工作（创建执行上下文 callstack），存在变量和函数提升 


// eg1:变量提升
var fun = function(){
    console.log('f1')
}

fun() 
var fun = function(){
    console.log('f2')
}
fun()

// eg2 函数提升
function fun(){
    console.log('f1')
}

fun()
function fun(){
    console.log('f2')
}
fun()



// 来分析一些执行上下文吧 ,一个执行上下文包含：{变量对象vo，作用域链scope，this}

function out(){
    function inner(){}
    inner()
}
out()
ESCtack = [globalContext]
ESCtack.push(outContext)
ESCtack.push(innerContext)
ESCtack.pop(innerContext)
ESCtack.pop(outContext)


function out(){
   return function inner(){}
}
out()()
ESCtack = [globalContext]
ESCtack.push(outContext)
ESCtack.pop(outContext)
ESCtack.push(innerContext)
ESCtack.pop(innerContext)

//一、变量对象 -----------------------------
//js 执行一段可执行的代码时候，会创建执行上下文，
//上下文包含{变量对象VO(变量和函数)，活动对象AO，作用域链[[scope]]，this}

// 顺序 全局的变量对象(变量函数提升) -- 函数变量对象 --- 活动变量对象
// 函数执行的时候 1，进入执行上下文，创建活动对象2、执行

//1、先创建全局的变量对象 vo={name:xx.fun:xxx},先处理函数，再处理变量，变量和函数名同名的时候不会覆盖和干扰
//2、函数的变量对象先创建arguments对象
//3、到了执行函数时候，会先创建活动对象(给变量对象添加形参、函数声明、变量声明的初始值)
//4、代码执行的时候再次修改变量对象的属性值


console.log(a)
function a(){
    var c = '12'
    var b = function(){}
    console.log('1')
}
a()
var a = 'c' //=== var a ; a = 'c'

// 编译
// 全局变量对象VO globalContext.VO
// {
//     a:refreence to function
// }
// 函数变量对象VO aContext.VO
// {
//     arguments:{length:0}
// }
// 函数执行前AO
// {
//     arguments:{length:0}
//     c:undefined,
//     b:reference to function
// }
// 执行，先看自己 AO,有没有，没有往父级找直到没有
// {
//     arguments:{length:0}
//     c:'12',
//     b:function
// }



//二 、[[scopes]](分定义和执行时候) ------------------
//作用域定义一个变量访问的范围，分为全局作用域、函数作用域、eval()
//函数执行的时候才会创建执行上下文,放入到调用栈中，但是作用域链在定义的时候已经确定了

// ------ important -----
// 作用域链：当查找一个变量的时候，先从当前的上下文的变量对象中找，如果没有找到，就从父级的执行上下文的变量对象中查找
// 一直找到全局的上下文的变量对象也就是全局对象window,由多个执行上下文的变量对象形成的链表结构就是作用域链



//理解为什么函数定义的时候就已经确定作用域链了，因为在定义的时候有个[scope]保存了父变量对象到里面

//执行的时候这个scope会将改变，同时ecstack执行上下文也会改变
function foo(){
    function bar(){}
}
foo()

// 定义
// foo.[scopes] = [globalContext.VO]
// bar.[scopes] = [fooContext.AO,globalContext.VO] 这里也是闭包理解的根本

// foo执行前，将创建的AO丢到[scope]最前面
// foo.[[scopes]] = [globalContext.VO].unshift(AO)
// foo执行后，回收AO，变成foo.[[scopes]] = [globalContext.VO]


// 取个例子分析
var scope = "global scope";
function funscope(){
    var scope2 = 'local scope';
    return scope2;
}
funscope();

// 1.函数定义
// funscope.[[scope]] = [globalContext.VO]
// 2.函数执行前,创建funscopeContext 上下文,放入执行上下文的栈中
// ECStack = [funscopeContext,globalContext]
// 3.还是函数执行前的准备工作1，复制原来的scope属性创建作用域链
// funscopeContext = {
//     scope:funscope.[[scope]]
// }
// 4.准备工作2，创建函数的活动对象，并初始化,同时也放到scope
// funscopeContext = {
//     scope:[Ao,[globalContext.VO]],
//     AO:{
//         argument:{},
//         scope2
//     }
// }
// 5.函数执行，修改AO
// funscopeContext = {
//     scope:[Ao,[globalContext.VO]],
//     AO:{
//         argument:{},
//         scope2:'local scope'
//     }
// }
// 6.执行完成,从执行上下文栈中弹出
// ECStack = [globalContext]


