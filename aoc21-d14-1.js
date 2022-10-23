fs = require('fs');
const inputFile = fs.readFileSync('aoc21-d14inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

const input = inputFile.split('\r\n');

const initialPoly = input[0];
const polyPairs = {};
for (let i = 2; i < input.length; i++) {
    let pair = input[i].split(' -> ');
    polyPairs[pair[0]] = pair[1]
}
//console.log(polyPairs);

let polyStepWise = [initialPoly]
let totalSteps = 10
for (let step = 0; step < totalSteps; step++) {
    let currPoly = polyStepWise[polyStepWise.length - 1]
    let newPoly = currPoly[0]
    for (let ch = 0; ch < currPoly.length - 1; ch++) {
        let currPair = currPoly[ch] + currPoly[ch + 1]
        newPoly += polyPairs[currPair] + currPoly[ch + 1]
    }
    polyStepWise.push(newPoly)
}

let finalPoly = polyStepWise[polyStepWise.length - 1]
let totalCount = {}
for (let i = 0; i < finalPoly.length; i++){
    
    if (!(finalPoly[i] in totalCount)) totalCount[finalPoly[i]] = 0;
    totalCount[finalPoly[i]]++
}

console.log(totalSteps);
console.log(totalCount);