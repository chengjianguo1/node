let fs = require('fs');


setInterval(() => {
    fs.appendFileSync('1.txt','zf')
}, 1000);