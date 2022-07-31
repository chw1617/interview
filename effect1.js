//桶收集
let bucket = new WeakMap()
let activeEffect = null
function reactive(obj){
    return new Proxy(obj,{
        get(target,key){
            track(target,key)
            return target[key]
        },
        set(targrt,key,val){
            targrt[key] = val
            trigger(targrt,key)
            return true
        }
    })
}
//追踪
function track(target,key){
    // if(!activeEffect) return targert[key]
    // // 三层 bucket target key
    // let depsMap = bucket.get(targert)
    // if(!depsMap){
    //     bucket.set(targert,(depsMap = new Map()))
    // }
    // let effects = depsMap.get(key)
    // if(!effects){
    //     depsMap.set(key,(effects = new Set()))
    // }
    // effects.add(activeEffect) //收集
    // activeEffect.deps.push(effects)
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
function trigger(targert,key){
    // const depsMap = bucket.get(targert)
    // if(!depsMap)return
    // const effects = depsMap.get(key)
    // //新开一个run set
    // let runEffect = new Set()
    // effects && effects.forEach(effectfn => {
    //     if(effectfn !== activeEffect){
    //         runEffect.add(effectfn)
    //     }
    // })
    // console.log('set',runEffect)
    // runEffect.forEach(fn=>{
    //     //收集副作用函数有调度器
    //     if(fn.options.schedular){
    //         fn.options.schedular(fn)
    //     }else{
    //         fn()
    //     }
    // })
    let depsMap = bucket.get(targert)
    if(!depsMap){return}
    let deps = depsMap.get(key)
    console.log('set-----',deps)
    //新开set去执行
    let runDeps = new Set(deps)
    // deps &&  deps.forEach(fn=>{
    //     if(fn !== activeEffect){
    //         runDeps.add(fn)
    //     }
    // })
    runDeps && runDeps.forEach(effectFn=>{
        //判断是否有调度器
        if(effectFn.options.schedular){
            effectFn.options.schedular(effectFn) //将副作用函数抛出
        }else{
            effectFn()
        }
    })
}


//副作用
function effect(fn,option={}){
    // const effectFn = ()=>{
    //     console.log('clean')
    //     //需要清除deps
    //     clean(effectFn)
    //     activeEffect = effectFn //保存引用，外部可以修改activeEffect会相互影响
    //     fn()
    // }
    // effectFn.deps = []
    // effectFn.options = option
    // effectFn()
    const effectFn = ()=>{
        console.log('effect11')
        //清空依赖
        clean(effectFn)
        activeEffect = effectFn
        // effectStack.push(effectFn)
        fn()
        // effectStack.pop()
        // activeEffect = effectStack[effectStack.length -1]
    }
    console.log('effect')
    effectFn.deps = [] //存储依赖
    effectFn.options = option
    effectFn()
}
//清除依赖
function clean(effectFn){
    for(let i=0;i<effectFn.deps.length;i++){
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }   
    effectFn.deps.length = 0
    console.log('zhixn',effectFn)
}

const data = reactive({a:12,b:13})
effect(()=>{
    console.log('render',data.a,data.b)
})
data.a = 15
console.log('dep----',activeEffect)

// 渲染器（找到变更去更新） --- 编译器（标记动静太属性）

// 首次挂载
// createApp()
   createRenderer()
   createApp()
// mount()
   createVnode()
   render()