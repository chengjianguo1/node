
const express = require('./express');
const app = express()
app.get('/',function (req,res,next) { // 路由中间件
    console.log(1);
    next();
    console.log(4);
},function (req,res,next) {
    console.log(2);
    next();
    console.log(5);
},function (req,res,next) {
    console.log(3);
    // next(); // 觉得 当前逻辑是否需要向下执行
    console.log(6);
});
app.get('/',function (req,res) {
    res.end('ok')
});

// app.route('/').get(function () {
    
// }).post(function () {
    
// }).delete(function () {
    
// })



app.listen(3000);