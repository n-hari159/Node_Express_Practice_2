
// Running Parallel Promises
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1.....');
        resolve(1);
        // reject(new Error('something failed...'));
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2.....');
        resolve(2);
    }, 2000);
});

Promise.all([p1,p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));


// Returns when the first promise is fulfilled. Won't be an array but a simple 1.
// Promise.race([p1,p2])
//     .then(result => console.log(result))
//     .catch(err => console.log('Error', err.message));