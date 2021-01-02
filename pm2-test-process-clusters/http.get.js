const http = require('http');


for(let i =0 ; i < 10000;i++){
    http.get({
        port:3000,
        hostname:'localhost'
    },function (res) {
        res.on('data',function (data) {
            console.log(data.toString())
        })
    })
}