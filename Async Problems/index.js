// 1. Build custom Promise from scratch
console.log('Problem1 Start');
const set1 = setTimeout(() => {
    console.log('timeout');
}, 0);
const pr1 = new Promise(function (resolve, reject) {
    resolve('Promise Resolved');
    reject('Promise Rejected'); // ignored, because promise can only settle once
    throw new Error('Error!'); // error usng throw keyword, but wont work
});
pr1.then(function (value) {
    console.log(value);
}).catch(function (error) {
    console.error(error);
})
console.log('Problem1 End');

// Once a promise is resolved or rejected, further resolve() or reject() calls are ignored

// And this approach is wrong because resolve was already called and reject is never executed.

const p1 = new Promise(function (resolve, reject) {
    let val = Math.random().toFixed(2);
    if (val > 0.5) {
        //resolve(val, 'greater than 0.5');
        resolve({ val, message: 'greater than 0.5' });
    }
    else {
        reject({ val, message: 'less than 0.5' });
    }
});
p1.then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
});


// 2. Promise.all implementation
const pr21 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.All 1');
    }, 2000);
});
const pr22 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.All 2');
    }, 5000);
});
const pr23 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('Promise.All 3');
    }, 4000);
});
Promise.all([pr21, pr22, pr23])
    .then(function (val) {
        console.log('Pass:', val);
    }).catch(function (err) {
        console.log('Error:', err); // if any promise reject, entire promise fails 
    });


// 3. Design Promise.any that resolves to the first fulfilled promise.
const pr31 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('Promise.Any 1');
    }, 2000);
});
const pr32 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.Any 2');
    }, 5000);
});
const pr33 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.Any 3');
    }, 4000);
});
Promise.any([pr31, pr32, pr33])
    .then(function (val) {
        console.log('Pass:', val); // returns first fulfilled promise
    }).catch(function (err) {
        console.log('Error:', err); // only runs if all promise rejects - aggregate error
    });


// 4. Develop a Promise.race to resolve based on the fastest result
const pr41 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.Race 1');
    }, 2000);
});
const pr42 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.Race 2');
    }, 5000);
});
const pr43 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('Promise.Race 3');
    }, 4000);
});
Promise.race([pr41, pr42, pr43])
    .then(function (val) {
        console.log('Pass:', val); // return first fulfilled promise
    }).catch(function (err) {
        console.log('Error:', err); // return first reject promise
    });


// 5. Implement Promise.allsettled to handle muliple results - fulfilled or rejected
const pr51 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject('Promise.AllSettled 1');
    }, 2000);
});
const pr52 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.AllSettled 2');
    }, 5000);
});
const pr53 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('Promise.AllSettled 3');
    }, 4000);
});
Promise.allSettled([pr51, pr52, pr53])
    .then(function (val) {
        console.log('Pass:', val); // return first fulfilled promise
    }).finally(function () {
        console.log('Finally block');
    });
// Promise.allSettled() never rejects, so .catch() is not needed.
// 6. Add finally method for promises


// 7. convert traditional callback-based functions into promises (promisify)
// callback function
// function higherOrder(val1, val2, callback) {
//     const res =  val1 * val2;
//     console.log(res);
//     callback();
// }

// function result() {
//     console.log('Callback function');
// }
// higherOrder(5, 6, result);

// converterd into Promise
function higherOrder(val1, val2, callback) {
    return new Promise(function (resolve, reject) {
        const res = val1 * val2;
        if (res === 0 || res === null) {
            reject('Negative Value');
        }
        else {
            //console.log(res);
            resolve(res);
           // result(); - result() function is being called immediately after resolve(res), but JavaScript doesn’t wait for .then() to run synchronously after resolve is called        
        }
    });
}

function result() {
    console.log('Callback function');
}
higherOrder(5, 6)
.then(function(msg) {
    console.log('Resolved:', msg);
    result(); // Now runs after the promise is resolved and .then executes
}).catch(function(err) {
    console.error('Rejected', err);
});