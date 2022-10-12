
fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d11inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

