// 一 项目
// 1. 有没有自己编写过组件库和工具库，发布到npm,实现细节是怎么样的;
// 2. 项目中有没有自己搭建过脚手架 vue-cli | create-raect-app
// 3. 项目难点和解决方案

// 二 css基础：
// 1. 移动端适配方案，1、媒体查询 @media 2、动态rem flexible + postcss-px2rem(px--rem)  3、vw,vh + postcss-px-to-viewport || https://juejin.cn/post/6959047144065990663
// 2. 细说一下flex布局,父子容器都有哪些属性 || https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
// 3. 利用css编写一个倒三角形 
// 4. postcss ：js转换css代码工具，浏览器兼容和前缀添加 未来css添加今天ployfills
// 5. css3新增属性


// 三 js 基础
// 1、数据类型：说一下js的数据类型分那几种，分别有哪些，还有他们的存储地址（闭包里的基本类型）
// 2、类型判断：js 的数据类型判断方式有哪些 1、typeof 2、instanceof(手写) 3、Object.prototype.toString 4、isArray,isNaN
// 3、类型转换,包装类：强制转换和隐式转换,为什么字符串有方法和属性 || https://juejin.cn/post/6844904095774425101
// 4、this：bind,call,apply,new,普通函数,监听函数 优先级 + 题目测试
// 5、闭包: 什么是闭包以及引用场景 (访问函数内部的变量和变量保存在内存中) || https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html
// 6、作用域链:变量的可访问性,全局,函数,块级作用域 [[scopes]]
// 7、原型链：什么是原型链以及作用 说一个继承
// 8、事件：事件机制(捕获-目标-冒泡 ) html onclick="" dom 0 btn.onclcik=function(){} dom2,addevenlistener 移除方法有哪些; 
// 事件对象 e.preventdefault() e.stopPropagation()阻止捕获或冒泡 target(触发) ,cuurenttarget(添加监听) scroll事件不会冒泡，
// 事件委托(场景,ul>li 点击显示当前内容) || https://juejin.cn/post/6914600144621027336
// 9、事件循环 event loop：说一下事件循环  
//:当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
// 执行栈和任务队列(单线程) https://segmentfault.com/a/1190000022805523
// 10、promise: 说一下实现原理思路和api(静态方法 all (ok),allsettled(ok|no) eval(one),any(one suucess),,p和实例方法)  promise-polyfill 
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#%E5%88%9B%E5%BB%BApromise
// 11、es6+新增api：字符串模板,数组api,结构赋值,箭头函数，模块化，异步解决方案
// 12 深拷贝和浅拷贝 assign,拓展运输符 ,深拷贝(json.parse(json.stringify)) 递归
// 13 防抖节流; 1s 后准时出发throllte :input 2,等1s 中间有人,重新计算再等1s防抖debounce :scroll
// 14 模块化（命名空间--立即执行函数--commonjs--esmodule）
// 15 异步编程解决方案（回调函数，promise，generator,async,发布订阅，事件）


// 四 计算机网络
// 1. http 缓存: 强缓存200(expired 1.0,cache-control 1.1 )和协商缓 304(1.0 last-modify|if-modified-since ; etag|if-nono-match)存区别 || https://segmentfault.com/a/1190000021661656
// 2. https和http区别 || https://juejin.cn/post/6844903504046211079
// 3. 常见的状态码 
// 4. tcp/ip 的三次握手和四次挥手


// 五 框架
// 用法 
// 1.vue 父子组件通信
// 2.vue 生命周期
// 3.vue use,set api
// 4.data,props为啥返回函数
// 5.动画,slot
// 6.组件,指令,插件
// 7.computed（缓存）,watch,method（如果在template里面，每次渲染都会执行） 区别和应用场景
// 8.vuex state,getter,mutation,action,module



// 原理
// 1.vue原理:1，import 时候初始化了啥 2、new vue发生了什么，3、响应式原理，4，runtime + compiler  5,异步更新 
// 2.vue-router原理
// 3.vuex原理
// 4.响应式原理
// 5.vdom和 dom 区别
// 6.diff 算法（双端比较，最长递增子序列）

// 六 构建工具
// 1.webpack 核心概念和相关配置 
// loader {test:xx,use:xxx,include:xxx,exclude:xxx}
// 2.webpack 原理
// 3.webpack 中tree-shaking 原理
// webpack核心概念
// 静态模块打包工具 从一个入口或多个入口构建依赖关系图，打包成一个或者多个bundle 
// 1.入口 string| array | object
// 2.输出 object [name][hash] 占位符
// 3.loader 处理js,json之外的静态文件 test匹配出文件 ，use 那些loader来处理
// 4.plugins 打包优化，注入环境变量，资源管理（在webpack执行的某个生命周期而执行的动作）
// 5.mode 默认production ,develpoment
// 6.浏览器兼容 ie8以上，更低浏览器加入ployfill
// 7.环境 node 10.13.10 +
// loader webpack 默认只能处理js，json文件，为了能够处理静态资源，如css,image,font而引入loader
// 1.读取文件 - 2.分析依赖 3.收集依赖图 4.替换require
// 依赖图
// 模块热替换 ：程序有更改的时候，仅仅更新更改的那一部分，而不是重新加载整个页面
// 在应用程序中 hmr检测更新，hmr异步下载 通知应用程序，应用程序要求hmr更新 ,hmr 同步更新
// 在complier中
// 在模块中
// 在runtime中


// babel作用：1、转换es6新语法成es5语法，2、补充浏览器没有的新特性 3、转换源代码
// plugins:['a','b','c'] // 补充特性
// presets:['a','b','c'] //c > b > a 集成一组plugin插件



// 七 数据结构,算法,设计模式（单例模式，观察者模式，发布订阅模式）
// 1.数组和链表有啥区别 ,查找,插入, 删除时间、空间复杂度
// 2.树的深度遍历和广度遍历
// 3.快速排序实现思路
// 4.letecode 题目  
// 5.发布订阅和观察者模式实现


// test 
//单元测试 jest  ===> 构建一个测试用例
//组件测试 vue test library
//端到端测试 e2e cypress



// 手写题目
//1、防抖节流
//2、instanceof
//3、new,bind,call,apply
//4、排序搜索算法（冒泡，选择，插入，归并，快速）
//5、设计模式发布订阅



//场景题
// 1万条数据渲染，代码性能优化


//算法
//分析时间复杂度和空间复杂度

// node 文件模块
// 模块规范
// 查找策略
//abstruct syntax tree
// parse 词法，语法
// transform
// generate
// 插件化系统
//解耦和


// core -- api -- plugin
// 通过用法猜测设计
// 插件化
// 工具库
const core = {
    use(plugins){
        const {name,fn} = plugins
        this[name] = fn
    },
    install(plugin){
        // const {name,fn} = plugin()
        // this[name] = fn
        plugin(this)
    }
    p1:fn,
    p2:fn,
    p3:fn
}
function plugin1(core){
    // return {
    //     name:"p1",
    //     fn:function(){}
    // }
    core.use({
        name:'p1',
        fn:function(){}
    })
}
function plugin2(core){ //传递core 的目的是为了解决各个插件可以互相依赖
    // return { 完全独立
    //     name:"p2",
    //     fn:function(){}
    // }
    core.use({ 
        name:'p2',
        fn:function(){}
    })
}

core.install(plugin1)
core.install(plugin2)

console.log(core)

// vue
vue.use(plugin) // plugins:[p1,p2]

function use(plugin){
    this.plugin = this._pligins || []
    plugin()

}


// jqery

// babel
// vue-cli


