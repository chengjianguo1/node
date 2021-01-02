// 内部原理就是多进程 
// 分布式  前端和后端  集群 多个功能相同的来分担工作

// 集群 就可以实现多个cpu的负载均衡 一般情况 


// 不同进程 监听同一个端口号
const {fork}  = require('child_process');
const cpus = require('os').cpus().length;
const path = require('path');

// 现在主进程中先启动一个服务
const http = require('http');
let server = http.createServer(function (req,res) {
    res.end(process.pid+' '+ ' main end')
}).listen(3000);

for(let i = 0 ; i < cpus-1 ; i++ ){
    let cp = fork('server.js',{cwd:path.resolve(__dirname,'worker'),stdio:[0,1,2,'ipc']});
    cp.send('server',server); // 我可以在ipc 模式下第二个参数传入一个http服务 或者tcp服务
}
// 多个请求都是i/o密集
// cluster 集群