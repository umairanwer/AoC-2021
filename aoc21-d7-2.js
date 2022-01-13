fs = require('fs');

//let inputFile = fs.readFileSync('test.txt', 'utf8', (err, data) => { 
let inputFile = fs.readFileSync('aoc21-d7inp.txt', 'utf8', (err, data) => {
   if (err) throw err;});

let horPosns = inputFile.split(',').map(Number);

let target = 0;

//median method
let sorted = horPosns.sort((a,b) => a-b);
let median = (sorted[sorted.length/2] + sorted[sorted.length/2+1]) / 2;
console.log("Median:", median);
//Median: 323,    Total Fuel Use: 104757076

//average method
let average = horPosns.reduce((acc,cur) => acc+cur, 0)/horPosns.length;
console.log(`Avg: ${average}`);
target = Math.floor(average);
//Avg: 461.551,   Total Fuel Use: 95167302

console.log("Target:", target);
let fuelUse = horPosns.map(val => Math.abs(val-target));
fuelUse = fuelUse.map(val => {
   let sum = 0;
   for(i=1; i <= val; i++)  sum += i;  return sum;});

console.log("Total Fuel Use:",fuelUse.reduce((acc, cur) => acc+cur, 0))