//原型式继承：child.prototype ---> parent.prototype 应用类型的数据会被共享
//object.create 模拟实现
function create(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

//寄生继承 