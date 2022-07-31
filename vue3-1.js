// 前端框架：
1、纯运行时 render(obj)
const obj = {
    tag:'div',
    chiild:[
        {tag:'p',chiild:'vue'}
    ]
}
function render(obj,root){
    const el = document.createElement(obj.tag)
    //处理child
    if(typeof obj.chiild === 'string'){
        const text = obj.createTextNode(obj.chiild)
        el.appendChild(text)
    }else if(obj.chiild){
        obj.chiild.forEach(o=>{
            render(o,el)
        })
    }
    //挂载到根
    root.appendChild(el)
}
2、纯编译时 complier(template) ---- 
2.1 编译成命令式代码
function (template){ // sevle
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.innerHTML = 'vue'
    div.appendChild(p)
    document.body.appendChild(div)
}
3、运行时+编译时 let vnode = complier(template); render(vnode)

// 副作用：调用函数的时候对外部的影响
// complier
1、template(str) --- parse --- template AST
2、template AST  --- transform ---- jsAST
3、jsAST --- generator --- code render()

// 服务端渲染
1、vnode(obj) -- html(str) --- 客户端
2、就只有beforeCreate,create生命周期函数，不需要挂载

// 一 vnode 声明式描述 真正dom
const vnode = {
    tag:'div',// string|object|function  ： div|component
    props:{
        onclick:handler
    },
    chiild:[
        {tag:'h1'}
    ],
    patchFlag:1 //标记动态属性
}
//组件 h 函数 return vnode 
render(){
  return h('div',{onclick:handler})
}

//二  渲染器 
// 先判断字符串（element）还是对象（组件）
// 通过diff找出改动的地方
function renderer(vnode,container){
    if(typeof vnode.tag === 'string'){
        mountElement(vnode,container)
    }else if(typeof vnode.tag === 'function'){
        mountComponent(vnode,container)
    }
}
//将vnode 变成真实dom,本质是操作dom的api完成渲染工作，
function mountElement(){
    //创建元素
    const el = document.createElement(vnode.tag)
    //处理props
    if(vnode.props){
        for(let prop in vnode.props){
            if(/^on/.test(prop)){
                //事件
                el.addEventLinter(prop.substr(2).toLocaleLowerCase(),vnode.props[prop])
            }
        }
    }
    //处理childern
    if(typeof vnode.chiild === 'string'){
        const text = document.createTextNode(vnode.chiild)
        el.appendChild(text)
    }else if(Array.isArray(vnode.chiild)){
        //递归处理
        vnode.chiild.forEach(c=>renderer(e,el))
    }
    //挂载
    container.appendChild(el)
}
// 三组件:一组dom元素的封装,可以是一个函数,也可以是对象
function myCompnent(){
    return {
        ...vnode
    }
}
const myCompnent1 = {
    render(){
        return {
            ...vnode
        }
    }
}
const vnode = {tag:myCompnent}
// 挂载组件
function mountComponent(vnode,container){
    //得到vnode
    const subTree = vnode.tag() || vnode.tag.render()
    //再调用渲染器，最终判断的还是element
    renderer(subTree,container)
}

// 编译器： 将template编译成render函数，这里有大量的操作
// 总结 组件的实现依赖渲染器， 模板的编译依赖编译器
// 我们编译模板成render函数的时候，可以通过patchFlag来标记哪些是静态属性，哪些是动态属性
function render(){
    return {
        tag:'div',
        props:{
            id:'xx',
            class:cls
        },
        patchFlag:1 //1 class 是动态的
    }
}

//按照这个流程来读
// 响应式 --- 渲染器 --- 组件 --- 编译器


var vnode = {tag:'h1',chiild:'hello'}
var Text = Symbol('text')
function createRenderer(option){
    //取出不同平台的操作api
    const {
        createElement,
        setText,
        insert,

    } = option
    //这里会递归
    function patch(n1,n2,container){
        //如果n1,n2类型不同。没有比较的意义
        if(n1 && n1.tag !== n2.tag){
            unmount(n1)
            n1 = null
        }
        //描述内容相同
        const {tag} = n2
        if(typeof tag === 'string'){
            //元素
            //没有老节点
            if(!n1){
                mountElement(n2,container)
            }else{
                patchElement(n1,n2,container)
            }
        }else if(typeof tag === 'object'){
            //组件
        }else if(typeof tag == Text){
            //文本 symbol 来标识
        }
    }
    function render(vnode,container){
        if(vnode){
            patch(container._vnode,vnode,container)
        }else{
            if(container._vnode){
                //新的没有，只有老的，卸载老的
                unmount(container._vnode)
            }
        }
        container._vnode = vnode
    }
    return {
        render:render,
        createApp:createApp
    }
}
function mountElement(vnode,container){
    const el = document.createElement(vnode.tag)
    //处理child
    if(vnode.chiild){
        //str
        if(typeof vnode.chiild === 'string'){
            setText()
        }else if(Array.isArray(vnode.chiild)){
            vnode.chiild.forEach(chiild=>{
                //递归patch
                patch(null,chiild,el)
            })
        }
        //arr
    }
    //处理props
    if(vnode.props){
        for(let key in vnode.props){
            patchProp(el,key,null,vnode.props[key])
        }
    }
    //挂载
}
function patchElement(n1,n2,container){
    //处理props
    const el = n2.el = n1.props
    const oldP = n1.props
    const newP = n2.props
    for(key in newP){
        if(newP[key]!== oldP[key]){
            patchProp(el,key,oldP[key],newP[key])
        }
    }
    for(key in oldP){
        if(!(key in oldP)){ //卸载老prop
            patchProp(el,key,oldP[key],null)
        }
    }
    //处理child
    patchChild(n1,n2,el)

}
patchChild(n1,n2,container){
    if(typeof n2.chiild === 'string'){
        //新增是否为文本
        //旧节点只有三种可能：没有子节点、文本子节点、一组子节点
        //旧节点是一组节点
        if(Array.isArray(n1.chiild)){
            n1.chiild.forEach(c=>unmount(c))
        }
        setText(container,n2.container)
    }else if(Array.isArray(n2.chiild)){

    }
    // 这里时候，说明新旧节点都是一组节点
    if(Array.isArray(n1.chiild)){
        //diff
    }else{
        //没有新的，挂载老的
        n1.chiild.forEach(c=>patch(null,c,container))
    }

}
function unmount(vnode,container){
    const parent = vnode.el.parentNode
    if(parent){
        parent.removeChild(vnode.el)
    }
}
// 归一化算法  normalize
var renderer = createRenderer({option}) // option 传入不同平台的option，这样就可以实现不同平台的渲染了
// renderer = {render:{},hydrate:false,createApp()}
renderer.render(vnode,document.getElementById('root'))


// 渲染器和effect结合
const obj = reactive({a:12})
effect(()=>{
    //会重新执行
    const template = `<h1>${obj.a}</h1>`
    const vnode = complier(template)
    renderer.render(vnode,document.getElementById('#app'))
})
obj.a++ 