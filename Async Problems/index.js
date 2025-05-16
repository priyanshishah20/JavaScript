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
    .then(function (msg) {
        console.log('Resolved:', msg);
        result(); // Now runs after the promise is resolved and .then executes
    }).catch(function (err) {
        console.error('Rejected', err);
    });

// 8. Implement custom methods for promise.resolve() and promise.reject()
// resolve
function myResolve(val) {
    return new Promise(function (resolve, reject) {
        resolve(val); // resolves the Promise
    });
}

myResolve('Resolve - Custom Method')
    .then(function (result) {
        console.log(result); // Resolve - Custom Method
    });

// reject
function myReject(val) {
    return new Promise(function (resolve, reject) {
        reject(val);
    })
}
myReject('Reject - Custom Method')
    .catch(function (res) {
        console.log(res);
    })

// logs the promise object, not the resolve/reject value
function myRejectOld(val) {
    return new Promise(function (resolve, reject) {
        reject(val);
    })
}
console.log(myRejectOld('Reject - Custom Method (old way)')); // logs: Promise {<pending>}


// 9. Execute N async tasks in series - one after another
function awaitFunc(val) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            //console.log('Await function - setTimeOut');   
            resolve(`Await function - ${val}`);
            // if above resolve() is never called, the Promise never settles
        }, 3000);
    })
}
async function asyncFunction(num) {
    console.log('Async Function Start');
    for (let i = 0; i < num; i++) {
        // console.log(i);
        const result = await awaitFunc(i);
        console.log(result);
    }
    // and the await inside asyncFunction() waits forever and the below line is not executed
    console.log('Async Function End');
}
asyncFunction(4);


// 10. Handle N async tasks in parallel and collect results
function parallelFunc(i) {
    return new Promise(function (resolve) {
        const delay = Math.floor(Math.random() * 3000);
        setTimeout(() => {
            console.log(`Took ${i} done after ${delay} ms.`);
            resolve(`${i}`);
        }, delay);
    })
}

async function asyncParallelFunc(num) {
    const storePormises = [];
    for (let i = 0; i < num; i++) {
        storePormises.push(parallelFunc(i)); // create all tasks and push into array
    }
    const result = await Promise.all(storePormises); // wait for all
    console.log("Result:", result);
    // Tasks finished in random order But Promise.all() keeps the result in the original order (1 to 5)
}
asyncParallelFunc(5);

// 11. Process N async tasks in race to pick the fastest one. 
// same code as 10th question, just replace with Promise.race 

// 12. Recreate setTimeOut() from scratch
function timeoutFun() {
    console.log('SetTimeOut Start');
    setTimeout(() => {
        console.log('Executed after 2 seconds');
    }, 2000);
    console.log('SetTimeOut End');
}
timeoutFun();

document.getElementById('click-btn').addEventListener('click', function () {
    document.getElementById('text-display').textContent = `Button Clicked!`;
    console.log('Custom setTimeOut called');
    customsetTimeout(() => { // setTimeout
        document.getElementById('text-display').textContent = ``;
    }, 2000);
})

function customsetTimeout(callback, delay) {
    const startD = Date.now();

    const intervalId = setInterval(() => {
        const endD = Date.now();
        if (endD - startD >= delay) {
            //endD = Date.now();
            callback();
            clearInterval(intervalId);
        }
    }, 1);
}


// 13. Rebuild setInterval() for periodic execution
function timeInterval() {
    let visible = true;
    customsetInterval(() => { // setInterval
        if (visible) {
            document.getElementById('data-heading').textContent = '';
        }
        else {
            document.getElementById('data-heading').textContent = 'Async Problems';
        }
        visible = !visible; // flip it for the next turn 
        // cannot write false as it will work only 1 time 
    }, 2000);
}
//timeInterval();

function customsetInterval(callback, interval) {
    function repeat() {
        callback();
        setTimeout(repeat, interval);
    }
    setTimeout(repeat, interval);
}


// 14. Design a clearAllTimers function to cancel all timeouts and intervals.
const allTimeOut = [];
const allInterval = [];

// override setTimeout
const originalTimeout = window.setTimeout;
window.setTimeout = function (fun, delay) {
    const id = originalTimeout(fun, delay);
    allTimeOut.push(id);
    return id;
}

// override setInterval
const originalInterval = window.setInterval;
window.setInterval = function (fun, delay) {
    const id = originalInterval(fun, delay);
    allInterval.push(id);
    return id;
}

function clearAllTimers() {
    allTimeOut.forEach(clearTimeout);
    allInterval.forEach(clearInterval);
    console.log('Interval Cleared');
}

function timeInterval() {
    let visible = true;
    const intervalId = setInterval(() => {
        document.getElementById('data-heading').textContent = visible? '' : 'Async Problems';
        visible = !visible;
    }, 2000);
    return intervalId;
}

const intervalId = timeInterval();
setTimeout(function () {
    clearInterval(intervalId);
    
    // if called below function, will stop all timer functions after 9 secs and we dont want that.
  //  clearAllTimers();
}, 9000);


// 15. create a debounce function to limit how often a task is executed
function getDataFun() {
    const data = document.getElementById('search-id').value;
    console.log('fetching data..', data);
}
function debounce(fun, delay) {
    let timer;
    return function() {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fun.apply(context, args);
        }, delay);
    }
}
const debounceFun = debounce(getDataFun, 300);


// 16. Implement throttling to control te frequency of function calls
function throttle(fun, delay) {
    let lastCall = 0;

    return function(...args) {
        let now = new Date().getTime();

        if(now - lastCall >= delay) {
            lastCall = now;
            fun.apply(this, args);
        }
    }
}

function logScroll() {
    console.log('Scroll', new Date().toLocaleTimeString());
}

window.addEventListener('scroll', throttle(logScroll, 1000));