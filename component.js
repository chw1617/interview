// 组件化 可以是一个对象也可以是一个函数
    function myCom(){
       function data(){
            return data
        }
        function render(){
            return {
                ...nnode
            }
        }
        template:'<h1>hhh</h1>'
    }
   const vnode = {
       type:myCompnent,
       props:{}
   }
   function mountComponent(vnode,container,anchor){
       const componetOptions = vnode.type
       const {render,data,created,beforeMount,mounted,setup,update} = componetOptions
       //处理生命周期hook
       const state = reactive(data())
       //定义组件实例，保存组件信息
       const instance = {
           state,
           isMount:false,
           subTree:null
       }
       vnode.component = instance
       effect(()=>{
         //拿最新的vnode
         const subTree = render.call(state,state)
         if(!instance.isMount){
            beforeMount && beforeMount.call(state,state)
            patch(null,subTree,container)
            instance.isMount = true
            mounted && mounted.call(state)
         }else{
             //update hook
             patch(instance.subTree,subTree,container)
         }
       },{
           scheduler:queueJob
       })
       //处理响应式数据
       //加上effect 自更新

   }
   function patch(n1,n2,container){
     if(n1 && n1.type !== n2.type){
         unmount(n1)
         n1 = null
     }
     const {type} = n2
     if(typeof type == 'string'){
         //元素
     }else(typeof type === 'object'){
         //组件
         if(!n1){//被mounted
             mountComponet(null,n2,container)
         }else{//被update
             patchComponet(n1,n2,container)
         }
     }
   }
   
 // 组件自更新

// 组件实现
// 异步和函数组件
// 内置组件