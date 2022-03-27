//websocket.io + html5:websoket

//前后端都通用的socket.io 双工通信，基于http 学习地址：https://socket.io/
//优点：
1、没有跨域问题
2、可以传送文本、也可以传送二进制文件
3、客户端和服务端都可以发起请求
4、协议的标识是ws
5、建立在tcp 协议上，服务端比较容易实现
6、和http 有很好的兼容性，端口也是443和80，握手阶段也是采用http协议


// client demo 
let ws = new WebSocket('wss://echo.websocker.io')
ws.onopen = function(e){
    console.log('connection open')
}
ws.onclose = function(e){
    console.log('connection received message')
} 
ws.onclose = function(e){
    console.log('connection close')
}