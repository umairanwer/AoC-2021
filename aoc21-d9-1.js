const { exit } = require('process');

fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d9inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');
//inputData.pop();

//obj storing all min values with posns {(val, r, c)}
let minValAndPosns = [];
let minSum = 0;

for (let row = 0; row < inputData.length; row++) {
    for (let col = 0; col < inputData[row].length; col++) {

        let currVal = inputData[row][col];

        // get values for all 4 sides of current posn
        // if one of the posns don't exist (corner / edge), set it to 10
        // so it is greater than all possible values (as if it doesn't exist)
        // M = minus, P = plus

        let rowM1 = (row != 0) ? inputData[row - 1][col] : 10;
        let rowP1 = (row != inputData.length - 1) ? inputData[row + 1][col] : 10;
        let colM1 = (col != 0) ? inputData[row][col - 1] : 10;
        let colP1 = (col != inputData[row].length - 1) ? inputData[row][col + 1] : 10;

        //if neither row nor column are outer most
        //search all 4 sides
        if (Math.min(rowM1, rowP1, colM1, colP1) > currVal) {
            minValAndPosns.push(currVal, row, col);
            minSum += parseInt(currVal) + 1;
        }

    }
}
console.log(minValAndPosns);
console.log(minSum);