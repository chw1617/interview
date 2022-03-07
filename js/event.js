
setTimeout(() => {
    console.log('1');
    Promise.resolve().then(() => {
        console.log('2');
    })
}, 0);

console.log('3');
new Promise(function(resolve, reject) {
    console.log('4');
    setTimeout(function() {
        console.log('5');
        resolve('6')
    }, 0)
})



// 3,4,1,2,5