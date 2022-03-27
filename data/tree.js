// 一个树结构包含多个父子节点关系，每个节点都包含一个父节点（根节点除外）以及有零个或者多个子节点


//二叉树：只能有两个节点，左边的节点值小于右边
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}
class Tree {
    constructor() {
        this.root = null
    }

    insert(key) {
        let node = new Node(key)
        if (this.root === null) {
            this.root = node
        } else {
            this.insertNode(node, this.root)
        }
    }
    insertNode(node, fNode) {
        if (node.key <= fNode.key) { //left
            if (fNode.left === null) {
                fNode.left = node
            } else {
                this.insertNode(node, fNode.left)
            }
        } else {
            if (fNode.right === null) {
                fNode.right = node
            } else {
                this.insertNode(node, fNode.right)
            }
        }
    }
}

// let tree = new Tree()
// tree.insert(5)
// tree.insert(6)
// tree.insert(3)
// tree.insert(2)
// tree.insert(7)
// console.log(tree)

// 深度遍历：自上而下遍历stack

function depth(tree, list=[]) {
    // list.push(tree)
    tree.children.forEach(child => {
        list.push(child)
        if (child.children) {
            depth(child, list)
        }
    }); 
    console.log(list)
}

let obj = {
    children: [{
        index: 0,
        children: [{
            index: 1,
            children: [{
                index: 3
            }]
        }]
    }, {
        index: 4
    }, {
        index: 5,
        children: [{
            index: 7,
            children: [{
                index: 8
            }]
        }]
    }, {
        index: 6
    }]
}

// depth(obj)
function dfs(node){
    let stack = []
    let list = []
    stack.push(node)
    while(stack.length){
        // console.log(stack)
        let item = stack.pop()
        let child = item.children || []
        list.push(item)
        for(let i = child.length-1;i>=0;i--){
            stack.push(child[i])
        }
    }
    console.log(list)
}
// dfs(obj)

// 广度遍历：一层一层遍历queue




// //tree dom,级联选择，{value:xx,children:[]}
// // 1.可以利用object 和 array 来表示
// // 2.操作：深度和广度优先遍历 ，二叉树的前中后序遍历

let tree = {
    val: 'a',
    children: [
      {
        val: 'b',
        children: [
          {
            val: 'd',
          },
          {
            val: 'e',
          }
        ]
      },
      {
        val: 'c',
        children: [
          {
            val: 'f',
            children:[{val:'ff'},{val:'ffg'}]
          },
          {
            val: 'g',
          }
        ]
      }
    ]
  }
  dfs(tree)
//   // dfs  深度优先遍历就是尽可能深的访问树的分支
//   // 1、先访问根节点
//   // 2. 挨个对树的子节点进行递归访问
//   // const dfs = function (root) {
//   //   console.log(root.val)
//   //   if (root.children) {
//   //     root.children.forEach(dfs)
//   //   }
//   // }
  
//   const dfs = (root) => {
//     console.log(root.val)
//     //结束条件
//     if (root.children) {
//       root.children.forEach(el => {
//         dfs(el)
//       });
//     }
//   }
//   dfs(tree)
  
//   // bfs  广度优先遍历是先访问离根节点最近的节点
//   //1.创建一个队列，将根节点入队
//   //2.根节点出队并访问
//   //3.将子节点全部入队
//   //4.重复2，3
  
//   // const bfs = function (root) {
//   //   let queue = []
//   //   queue.push(root)
//   //   while (queue.length) {
//   //     let top = queue.shift()
//   //     console.log('bfs', queue, top.val)
//   //     if (top.children) {
//   //       top.children.forEach(el => {
//   //         queue.push(el)
//   //       })
//   //     }
//   //   }
//   // }
  
//   const bfs = (root) => {
//     let queue = []
//     queue.push(root)
//     //不断出队和入队
//     while (queue.length) {
//       // 队头出队
//       let top = queue.shift()
//       console.log(top.val)
//       if (top.children) {
//         //子节点挨个入队
//         top.children.forEach(el => {
//           queue.push(el)
//         })
//       }
//     }
//   }
  
//   bfs(tree)