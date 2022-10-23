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

let totalSteps = 40
let pairCounts = {}
// count pairs of initial polymer
for (let i = 0; i < initialPoly.length - 1; i++) {
    let pair = initialPoly[i] + initialPoly[i + 1]
    if (!(pair in pairCounts)) pairCounts[pair] = 0;
    pairCounts[pair]++;
}

for (let step = 0; step < totalSteps; step++) {
    console.log(`Step: ${step+1}`);
    currPairCount = { }
    for (p in pairCounts) {
            let pairResult = polyPairs[p]
            let firstPair = p[0] + pairResult;
            let secondPair = pairResult + p[1];
            //console.log(p, pairResult, firstPair, secondPair)
            if (!(firstPair in currPairCount)) currPairCount[firstPair] = 0
            if (!(secondPair in currPairCount)) currPairCount[secondPair] = 0
            currPairCount[firstPair] += pairCounts[p]
            currPairCount[secondPair] += pairCounts[p]
        
    }
    //console.log("STEP",step, countLtrs(pairCounts), pairCounts);
    pairCounts = {...currPairCount};
}

//console.log(pairCounts);
console.log(Object.keys(pairCounts).length);
let numLtrs = countLtrs(pairCounts)
let min = Infinity, max = 0;

for (const key in numLtrs) {
    max = numLtrs[key] > max ? numLtrs[key] : max;
    min = numLtrs[key] < min ? numLtrs[key] : min;
}
console.log(`DIfference is ${max-min}`)

// count only second letter of each pair, this avoids duplication
// at the end the first letter of the very first sequence is added
// in this way all letters will be accounted for
function countLtrs(pairCounts) {
    let letters = {}
    let pairKeys = Object.keys(pairCounts);
    for (let i = 0; i < pairKeys.length; i++) {
        let secLtr = pairKeys[i][1]
        if (!(secLtr in letters)) letters[secLtr] = 0;
        letters[secLtr] += pairCounts[pairKeys[i]]
    }
    let initialLtr = initialPoly[0];
    if (!(initialLtr in letters)) letters[initialLtr] = 0;
    letters[initialLtr]++

    return letters;
}