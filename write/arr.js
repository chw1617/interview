// 1.给定一个数组，将数组中的元素往右移动k个位置，k是非负正数

// 例子：输入 arr = [1,2,3,4,5,6,7] 和 k = 3  
// 输出 [5,6,7,1,2,3,4]
// 第一步移动 [7,1,2,3,4,5,6] 
// 第二步移动 [7,6,1,2,3,4,5] 
// 第三步移动 [7,6，5,1,2,3,4] 


// 算法是一个优化的过程
// 1、 key == length
// 2、 key > length / 2 
// 3、 怎么移动 
// 索引交换 arr[i] = arr[j] temp = arr[i] arr[j] = arr[i] 
// unshift(pop()) push(shift())
// push(splice(i,k))


function move (arr, k) {
  if (!arr || !k) {
    return
  }
  let len = arr.length
  k = k % len
  if (k >= len / 2) {
    console.log(k)
    //左边移动 前面丢到后面
    arr.push(...arr.splice(0,len-k)) //右
  } else {
    //后面的切拿到前面
    arr.unshift(...arr.splice(len-k,k)) //左 len - k
  }

  console.log(arr)
}

move([1, 2, 3, 4, 5, 6, 7], 3)