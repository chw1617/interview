let _state = [] //源码是利用链表来维护
let index = 0

//多次使用时候，用数组，链表来维护
function useState (initVal) {
  let _index = index++
  _state[_index] = _state[_index] === undefined ? initVal : _state[index]

  const setState = (newVal) => { //回调更新，更新state,执行render
    _state[_index] = newVal
    render()
  }
  return [_state[_index], setState] //返回新的状态
}



function render () {
  let [a, setA] = useState(1) //不能在for,if中使用
  let [b, setB] = useState(2)

  console.log(a, setA)
  console.log(b, setB)
  // setA(2) // 回调
  // console.log(a, setA)
}


render()