let depths = [];

fs = require('fs');

//fs.readFile('aoc21-1inp.txt', 'utf8', (err, data) => {
let inputFile = fs.readFileSync('aoc21-1inp.txt', 'utf8', (err, data) => {
    if (err) throw err;});

depths = inputFile.split('\n').map(Number);

let numInc = 0;
for(let i=0; i<depths.length-3; i++)
    if((depths[i+1]+depths[i+2]+depths[i+3]) > (depths[i]+depths[i+1]+depths[i+2]))   numInc++;
console.log(numInc);