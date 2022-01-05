let diagnostic = [];

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d3inp.txt', 'utf8', (err, data) => {
    if (err) throw err;});

diagnostic = inputFile.split('\n');
let numInputs = diagnostic.length-1;
let binSize = 12;
let bitSum = [0,0,0,0,0,0,0,0,0,0,0,0];
let gamma = [0,0,0,0,0,0,0,0,0,0,0,0];
let epsilon = [0,0,0,0,0,0,0,0,0,0,0,0];

for(let i=0; i < numInputs; i++)
    for(let j=0; j < binSize; j++)
        bitSum[j] += parseInt(diagnostic[i][j]);

for(let i=0; i< binSize; i++){
    (bitSum[i] - numInputs/2 > 0) ?  gamma[i] = 1 : epsilon[i] = 1;
}
console.log(parseInt(gamma.join(""),2), parseInt(epsilon.join(""),2));