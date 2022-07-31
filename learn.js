// 大文件上传 时间切片，空闲时间计算

// 位运算在源码中运用

// 前端发展历程
// jquery --- mvvm

// vue3 框架
//副作用
// let activeEffect 
// function effect(fn){
//     activeEffect = fn
//     fn()
    
// }
// //收集effect {key:[effect,effect2]}
// let effects = new Set()
  
// //渲染数据
// function render(){
//     let compenont = `<div>${obj.age}<div/>`
//     console.log('render')
//     // window.document.innerHtml = compenont
// }   

//   //数据响应
//   function reactive(obj){
//     return new Proxy(obj,{
//         get(target,prop){
//             activeEffect && effects.add(activeEffect)
//             console.log('get',target,prop)
//             //收集effect
//             return target[prop]
//         },
//         set(target,prop,val){
//             console.log('set',target,prop,val)
//             target[prop] = val
//             effects.forEach(fn=>{
//                 console.log('fn',fn)
//                 fn()
//             })
//             // render() 
//         }
//     })
//   }
//   let obj = reactive({age:18})
//   obj.age = 19
//   effect(()=>{
//       //修改数据后的代码
//       render()
//   })
//     // console.log(obj.age)
//     console.log(effects)

  // fiber时间切片 requestIdCallback
  //vdom 树型结构 

  //编译 写一个轮子

  //vite
  


  //vue3
  //收集所有副作用
//   targetMap = {
//       target:[effect,effect,effect]
//   }
//   let effects = new Set() 
//   let activeEffect = null
//   function effect(fn){
//     activeEffect = fn
//     fn()
//   }

//   function reactive(obj){
//       return new Proxy(obj,{
//           get(target,prop){
//               activeEffect && effects.add(activeEffect) 
//               console.log('get')
//               return target[prop]
//           },
//           set(target,prop,val){
//               target[prop] = val
//               // 去执行
//               console.log('set')
//               effects.forEach(fn=>fn())
//               return true
//           }
//       })
//   }

//   function render(){
//       console.log('render',obj.age)
//   }

  


//   const obj = reactive({age:12})
// //   console.log(11,obj.age)
//   obj.age = 15
//   effect(()=>{
//       //修改数据后执行
//       render()
//   })
//   console.log(22,effects)


let set = new Set([1])
let Nset = new Set(set)
Nset.forEach(item=>{
  console.log('zhixin',item)
  set.delete(1)
  set.add(1)
})
console.log('zhixin',Nset)