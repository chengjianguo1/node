const {spawn,fork} = require('child_process');
const path = require('path');

// spawn

// fork的特点默认就是使用node命令  也是缺点 不能使用其他命令了

const cp = fork('sum.js',['a','b'],{
    cwd:path.resolve(__dirname,'worker'),
    // stdio:[0,1,2,'ipc']
});
// 可以通过 on('message') 和 send方法来通信 

// 父进程什么时候结束 要取决于子进程什么是结束 
cp.send('hello 我是父亲'); // websocket  webworker
cp.on('message',function (data) {
    console.log(data);
    cp.kill(); // 杀死儿子
})

// 父子间的通信 
cp.on('error',function (err) {
    console.log(err);
})
cp.on('close',function () {
    console.log('子进程关闭了')
})
cp.on('exit',function () {
    console.log('子进程退出')
})