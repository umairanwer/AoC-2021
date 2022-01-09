fs = require('fs');

//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d7inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let horPosns = inputFile.split(',').map(Number);

//median method
let sorted = horPosns.sort((a,b) => a-b);
let median = (sorted[sorted.length/2] + sorted[sorted.length/2+1]) / 2;
console.log("Median:", median);

let fuelUse = sorted.map(val => Math.abs(val-median));
console.log("Total Fuel Use:",fuelUse.reduce((acc, cur) => acc+cur, 0))