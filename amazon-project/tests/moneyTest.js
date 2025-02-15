import { currency } from "../scripts/utils/money.js";

console.log('Test Suite: currency');
console.log('converts cents into dollars');
if(currency(2195) === '21.95') {
    console.log('Passed');
}
else {
    console.log('failed');
}

console.log('works with 0');
if(currency(0) === '0.00') {
    console.log('Passed');
}
else {
    console.log('failed');
}

console.log('Rounds up with the nearest cents');
if(currency(2000.5) === '20.01') {
    console.log('Passed');
}
else {
    console.log('failed');
}

console.log('Rounds up with the nearest cents');
if(currency(2000.4) === '20.00') {
    console.log('Passed');
}
else {
    console.log('failed');
}