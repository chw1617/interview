//全局状态管理vuex,reudx
//基本使用:集中式管理所有组件的状态 state --update--  view ,  action --update--state
//1 、安装为vue 插件 Vue.use(Vuex) : $store = this.$options.store
//2 、初始化 
const stroe = new Vuex.store({
    state:{
        state1:'xx',
        state2:'xx'
    },
    getters:{
        getState1(state){
            return status.state1
        }
    },
    mutations:{ //view: store.commit('changeState')
        changeState(state){
            state.state1 = 'xx'
        }
    },
    actions:{ //view: stroe.dispatch('asyncChange')
        asyncChange(context){
            context.commit('changeState')
        }
    }
})
//3、放置到实例化的Vue中合并 : new Vue({store})

//实现原理 
class Store{
    constructor(options){ //{state:{},getters:{},mutations:{}}
        this.state = options.state || {} //this.$store.state 实例组件中访问 this.$store = new Store()
        //1、将state的数据变成响应式
        this._s = new Vue({
            data:{
                state:options.state
            }
        })
        // getter 实现 ------ {fn,fn}
        const getters = options.getters || {}
        this.getters = {}
        Object.keys(getters).forEach(key=>{
            //也变成响应式
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state) //执行getter方法
                }
            })
        })
        //mutations 实现 {fn,fn} commit('type')
        const mutations = options.mutations
        this.mutations = {}
        Object.keys(mutations).forEach(type=>{
            this.mutations[type] = (payload)=>{ //闭包传递参数
                return mutations[type](this.state,payload)
            }
        })
        //actions 实现 {fn,fn}
        const actions = options.actions
        this.actions = {}
        Object.keys(actions).forEach(action=>{
            this.actions[action] = (payload)=>{
                return actions[actions](this,payload)
            }
        })
        
    }
    get state(){ //减少获取层级
        return this._s.state
    }
    commit(type,payload){
        this.mutations[type](payload)
    }
    dispatch(action,payload){
        this.actions[action](payload)
    }
}
