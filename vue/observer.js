// initState 
// 处理props,methods,data,computed,watch
// computed 中的key 不能和data,prop重复
// 处理data做了三件事： 1.判重：不能和method,prop属性相同，2.代理到vm,3.设置响应式
// 核心是通过object.definedProperty 拦截对数据访问和设置
// 对于对象，访问数据的时候（obj.key）get()进行依赖收集，在dep中存储watcher,set() 设置数据的时候dep notify通知watcher update
// 对于数组, 拦截数组的七个改变自身的方法  push,pop,shift.unshift,sort,splice,reverse 添加新数据进行响应式拦截，dep 通知更新，delete时候也是dep 通知更新
