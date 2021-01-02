const http = require('http');


http.createServer((req,res)=>{
    if(req.url === '/sum'){
        let total = 0; // 单独交给一个进程来出来 node中不能开启线程 开一个进程
        for(let i = 0; i < 100*10000*10000;i++){
            total+=i;
        }
        res.end(total + '');
    }else{
        res.end('other');
    }

}).listen(3000);