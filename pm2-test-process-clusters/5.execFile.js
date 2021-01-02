const {spawn,fork,execFile,exec} = require('child_process');
const path = require('path');
// bat cmd sh 都可以使用这个方法 内部也是基于 spawn 
// http-server 获取当前目录下的文件夹
// 这个方法不会创建命令行 

// exec 会创建一个命令行 将命令放到命令行中执行
// exec 性能低 因为内部需要产生一个命令行 
const cp = exec('path',{
    cwd:path.resolve(__dirname,'worker')
},function (err,stdout,stderr) {
    console.log(stdout);
});

// spawn  execFile  fork 

cp.on('error',function (err) {
    console.log(err);
})
cp.on('close',function () {
    console.log('子进程关闭了')
})
cp.on('exit',function () {
    console.log('子进程退出')
})