let depths = [];

fs = require('fs');

//fs.readFile('aoc21-1inp.txt', 'utf8', (err, data) => {
let inputFile = fs.readFileSync('aoc21-1inp.txt', 'utf8', (err, data) => {
    if (err) throw err;});

depths = inputFile.split('\n').map(Number);

let numInc = 0;
for(let i=0; i<depths.length-1; i++)
    if(depths[i+1]>depths[i])   numInc++;
console.log(numInc);