//响应式 ref,toref, reactivity
//运行时 runtime-core
//编译时 complier diff -- patch
// vue2|3 区别
// 响应式改变 
// vue2.0 
// Object.defineProperty(obj,prop,{ //对对象新增和移除无法预测，数组也不行
//     get(){dep.push(watcher)}
//     set(){dep.notify()}
// })
// const obj = {
//     info:{name:'c'},
//     get name(){return this.info.name}
// }

// vue3.0
// proxy(target,hander)
const target = {a:12}
let p =new Proxy(target,{
    get(obj,prop){
        return (prop in obj)? obj[prop] : 'default'
    }
})
console.log(p)
p.b = undefined
console.log(p.a,p.b,p.c)
// 更好typescript支持

// treeshaking 去掉无用的代码

// 函数组合compsitsion api 取代mixin
