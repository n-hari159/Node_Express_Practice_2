
// _id: 12 bytes(24 characters)

// 4 bytes : time stamp
// 3 bytes : machine identifier
// 3 bytes : process identifier
// 3 bytes : counter

// 1 byte : 8 bits
// 2 ^ 8 = 256
// 2 ^ (24) = 16M 

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);