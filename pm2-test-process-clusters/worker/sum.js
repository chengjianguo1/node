let total = 0

for(let i = 0 ; i < 100*10000;i++){
    total += i;
}
process.stdout.write(''+'hello');
process.stdout.write(''+total);
// process.stdout.write('儿子'+process.pid+total+''); // string or buffer


// process.on('message',function (data) {
//     console.log(data);
//     process.send('我是儿子');
//     // process.nextTick(()=>{
//     //     process.exit();
//     // })
// })