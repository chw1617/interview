console.log({a,name}) //???

if(false){
    var name = 123
}
var a = 1
console.log({a,name}) //???


//node {a: undefined, name: undefined}
// {a: 1, name: undefined}
//浏览器
// {a: undefined, name: ''}
// {a: 1, name: ''}
