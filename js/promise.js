//手写promise
function Mypromise (fun) {
  this.queue = [] //异步执行，回调函数收集
  this.status = 'pendding'
  this.data = null
  //执行函数
  fun(resolveRes => { //这里有异步回调
    this.status = 'success'
    this.data = resolveRes
    console.log('zhixin', this.queue)
    this.queue[0] && this.queue[0](resolveRes)
  }, resjectRes => {
    this.status = 'fail'
    this.data = resjectRes
    this.queue[0] && this.queue[1](resjectRes)
  })
}
Mypromise.prototype.then = function (res, err) {
  console.log('then')
  if (this.status === 'success') {
    //同步
    res(this.data)
  } else if (this.status === 'fail') {
    err(this.data)
  } else {
    //异步
    this.queue.push(res, err)
  }
}


let p1 = new Mypromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 1000);
  // resolve('cc')
});


p1.then(res => {
  console.log('res', res)
}, err => {
  console.log('err', err)
})


let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11222)
  }, 100);
});

//手写all
Promise._all = function (arr) {
  return new Promise((resolve, reject) => {
    let all = []
    let count = 0
    //递归写法
    const next = () => {
      console.log('i', count)
      if (count === arr.length) {
        resolve(all)
        return
      }
      arr[count].then(res => {
        all.push(res)
        console.log('res', res, all)
        count++
        next(arr[count])
      })
    }
    next()
    //非递归
    // arr.forEach((item, i) => {
    //   console.log('zhixin', i)
    //   Promise.resolve(item).then(res => { //同时开启多个微任务
    //     console.log('res', res, all)
    //     all.push(res)
    //     count++
    //     if (count === arr.length) {
    //       resolve(all)
    //     }
    //   })
    // })
  })
}

// Promise._all([p1, p2]).then(res => {
//   console.log('all', res)
// })

