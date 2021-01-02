  // 我们的项目逻辑很多 
  const http = require('http');
  http.createServer((req, res) => {

    if (Math.random() > 0.5) {
      SDSADADSSA();
    }
    // 在集群的环境下可以监听同一个端口号
    res.end(process.pid + ':' + 'end')
  }).listen(3000);