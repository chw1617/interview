var name = "The Window";

var object = {
    name: "My Object",
    getNameFunc: function () {
        return function () {
            return this.name;
        };
    }
};

alert(object.getNameFunc()());


//防抖节流
//computed
//防抖:等待1s,有触发就清楚,在计算时间 (scroll) 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
function debounce(fn,await,immedat){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer) //有就清楚
        }
        if(immedat){
            let call = !timer
           timer =  setTimeout(()=>{
                fn.apply(this,arguments)
            })
            if(call){
               fn.apply(this,arguments)
            }
        }else{
            timer =  setTimeout(()=>{
                fn.apply(this,arguments)
            })
        }
    }
}

//节流 固定时间后就执行一个函数 input 高频事件触发，但在n秒内只会执行一次 
function thorlle(fn,await){
    let last = null
    return function(){
        let now = Date.now()
        if(now - last > await){
            fn.apply(this,arguments)
            last = now
        }
    }
}

function thorlle(fn,await){
    let timer = null
    return function(){
        timer = setTimeout(() => {
            fn.apply(this,arguments)
        }, await);
    }
}

