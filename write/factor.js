//递归：1、函数调用自己 2、有结束条件
recursion = function f(n){
    if(n<=1){
        return 1
    }
    // return n * f(n-1) //argument.callee
    return n * arguments.callee(n-1) //argument.callee
}

console.log(recursion(3))


