
// To create a promise which is already resolved
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

// same the case for rejected promise
const p = Promise.reject(new Error('reason for rejection....'));
p.then(error => console.log(error));