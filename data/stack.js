//特点：先进后出，只能在一端操作操作数据
//应用场景：函数调用栈，js 执行上下文栈 ,回溯问题中，可以存储访问过的路径和任务、撤销功能
//模拟实现
class Stack{
    constructor(){
        this.stack = []
    }
    push(item){
        this.stack.push(item)
    }
    pop(){
       return this.stack.pop()
    }
    size(){
        return this.stack.length
    }
    empty(){
        return this.stack.length !== 0
    }
    clear(){
        this.stack = []
    }
}


//例子：十进制转换成二进制
//思路：每次都对2取余，将余数存进栈中，同时每次都是除于2的结果再对2取余,直到为0
function decToBin(num){
    let stack = new Stack()
    let res = ''
    while(num>0){
        stack.push(num % 2)
        num = Math.floor(num / 2)
    }
    while(stack.empty()){
        res += stack.pop()
    }
    console.log('bin',res)
    return res
}

decToBin(10)
decToBin(8)
decToBin(256)
