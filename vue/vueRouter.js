//梳理vueRouter 主线
//1、vue.use(vueRouter) 安装为vue 的插件，beforeCreate 声明周期的时候混入$router $route 可以每个实例都可以访问
//2、let router = new vueRouter(option)
      //2.1 将routes路由表收集转换成matcher 匹配器 {match,getRoutes,addRoutes} 利用闭包实现，存储在内存中可以随时访问
      //2.2 根据不用的路由模式实例化成不同的history {hash,histroy} hash: 改变hash + 监听hashchange, history: pushState,replaceState + 监听popchange
      //2.3 url 改变 --- 触发事件监听 --- 改变vue-router current ----获得最新组件render: 
      //监听事件 window.addEventListener('hashchange',()=>{this.history.current = location.hash.slice(1)})
      //监听事件 window.addEventListener('popchange',()=>{this.history.current = location.pathname})
//3、router.beforeEach(fn) === 收集到实例方法的beforeHooks:[fn]
//3、new Vue({router}) // 合并配置选项