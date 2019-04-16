// const log = require('./logger');

// console.log(log);

// log('message');



// Working with path module
// const path = require('path');

// var pathObj = path.parse(__filename);

// console.log(pathObj);



// working with OS module
// const os  = require('os');

// var totalmMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(`total memory : ${totalmMemory}`);
// console.log(`free memory : ${freeMemory}`);



// working with file system module
const fs = require('fs');

// const files = fs.readdirSync('./');

// console.log(files);

fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});