const cluster = require('cluster');
const cpus = require('os').cpus();

// 入口文件

cluster.setupMaster({
    exec: require('path').resolve(__dirname,'worker/cluster.js'),
});

cluster.on('exit',function (worker) {
    console.log(worker.process.pid);
    cluster.fork(); // 在开启个进程
})
for(let i = 0; i < cpus.length ;i++){
    cluster.fork(); // child_process fork  会以当前文件创建子进程
    // 并且isMaster 为false 此时就会执行else方法
}
// pm2 专门 开启 重启 直接采用集群的方式
// 模块