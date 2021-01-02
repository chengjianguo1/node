// node中可以开启子进程 目的是为了充分利用多核cpu
// 开启子进程 可以帮助我们计算一些cpu密集型的操作

// 核心模块 创建进程
// spawn 产卵 可以使用流的方式来进行 进程间的通信  核心
//      - fork （用的比较多） 叉子
//      - execFile 执行文件
//      - exec
const {spawn} = require('child_process');
const path = require('path');
console.log(process.pid); // 每个进程都有一个id号 


// process.stdin 当前进程的监听用户的输入  0 
// process.stdout 用户标准输出 - console.log  1
// process.stderr 用户的错误输出  - console.error 2
// let fs = require('fs');
// fs.write(1,Buffer.from('珠峰'),0,6,function (err,bytesWritten) {
//     // console.log(err);
// })
// process.stdout.write('珠峰')
// node sum.js --port xxx --cwd directory
const cp = spawn('node',['sum.js'],{
    // current working directory
    cwd:path.resolve(__dirname,'worker'),
    // stdio:'ignore' // 如果填写的是ignore 默认会忽略掉 子进程的输出
    // stdio:[process.stdin,process.stdout,process.stderr]  'inherit'  [0,1,2]// 共享父进程的标注输出 错误输出 以及 标准输入
    // stdio:'pipe'// ['pipe','pipe','pipe'] 默认就是pipe方法
});
// 读流 写流   ipc  只要通信时 父子之间 标识一样就可以
// 通过流来通信


cp.stdin.on('data',function (data) {
    console.log(data.toString(),'---')
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