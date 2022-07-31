
// 模型 
// WeakMap     Map    Set

// target1     key1   fn1

// target2     key2   fn2

// target收集
let bucket = new WeakMap()
// 活动的effect 将reactive相互联系起来
let activeEffect = null
//响应式
function reactive(obj){
    return new Proxy(obj,{
        get(target,key){
            track(target,key)
            return target[key]
        },
        set(targert,key,val){
            targert[key] = val
            trigger(targert,key)
        }
    })
}
//追踪
function track(target,key){
    if(!activeEffect) return target[key]
    let depsMap = bucket.get(target)
    if(!depsMap){
        bucket.set(target,(depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if(!deps){
        depsMap.set(key,(deps = new Set()))
    }
    // console.log('track',depsMap,deps)
    deps.add(activeEffect)
    activeEffect.deps.push(deps) //收集
}
// 触发
function trigger(targert,key){
    let depsMap = bucket.get(targert)
    if(!depsMap){return}
    let deps = depsMap.get(key)
    console.log('set-----',deps)
    //新开set去执行
    let runDeps = new Set()
    deps &&  deps.forEach(fn=>{
        if(fn !== activeEffect){
            runDeps.add(fn)
        }
    })
    runDeps && runDeps.forEach(effectFn=>{
        //判断是否有调度器
        if(effectFn.options.schedular){
            effectFn.options.schedular(effectFn) //将副作用函数抛出
        }else{
            effectFn()
        }
    })
    // deps && deps.forEach(effectFn=>effectFn())
}
// 副作用函数
// option 加一个调度器，控制权给用户
// 栈管理当前执行的effect
let effectStack = []
function effect(fn,options={}){
  
    const effectFn = ()=>{
        console.log('effect11')
        //清空依赖
        clean(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length -1]
    }
    console.log('effect')
    effectFn.deps = [] //存储依赖
    effectFn.options = options
    effectFn()
    // activeEffect = fn
    // fn() //第一次执行一次
}
function clean(effectFn){
    for(let i=0;i<effectFn.deps.length;i++){
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }
    effectFn.deps.length = 0
}

// 加一个刷新的任务的队列
// let jobQueue = new Set()
// let p = Promise.resolve()
// let isFlush = false
// function flushJob(){
//     if(isFlush)return
//     isFlush = true
//     p.then(()=>{
//         jobQueue.forEach(job => job())
//     }).finally(()=>{
//         isFlush = false
//     })
// }
// test 
let data = reactive({a:1,b:12})
effect(()=>{
    console.log('render',data.a,data.b)
})
data.a = 15
console.log('activeEffect',activeEffect)
// effect(()=>{
//     var res = ''
//     // res = data.a ? data.b :'not' //一执行就收集
//     console.log('zhixin',data.b,res)
// },{
//     schedular(fn){
//         jobQueue.add(fn)
//         flushJob()
//     }
// })
// data.b++
// data.b++

// effect 嵌套
// effect(function f1(){
//     console.log('f1----')
//     effect(function f2(){
//         console.log('f2----',data.b)
//     })
//     console.log('f1:',data.a)
// })
// data.a = 15

// effect 无限循环
// effect(()=>{
//     data.a = data.a+1
// })




