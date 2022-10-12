
fs = require('fs');

let inputFile = fs.readFileSync('aoc21-d11inp.txt', 'utf8', (err, data) => {
    if (err) throw err;
});

let inputData = inputFile.split('\r\n');

// convert to a 2D array and parse all chars as ints
inputData = inputData.map(str => str.split(""))
inputData = inputData.map(row => row.map(ch => parseInt(ch)))

//console.log(inputData);

console.log("INITIAL DATA");
printOctos();

let flashCount = 0
// run for specified number of steps
for (let steps = 0; steps < 1000; steps++) {
    // store posns which already flashed in this step
    let flashedPosns = [];
    for (let row = 0; row < inputData.length; row++) {
        for (let col = 0; col < inputData[row].length; col++) {
            inputData[row][col]++;
        }
    }
    for (let row = 0; row < inputData.length; row++) {
        for (let col = 0; col < inputData[row].length; col++) {
            if (inputData[row][col] > 9) {
                octoFlash(row, col, flashedPosns);
            }
        }
    }

    // increment flash count by number of flash posns (i.e number of flashes)
    flashCount += flashedPosns.length;
    console.log("STEP", steps + 1, "Total Flashes:", flashCount, "Current Flashes:", flashedPosns.length);
    if (flashedPosns.length == inputData.length*inputData[0].length)  break
    //printOctos();
}

// this function will run recusrively on the neighbors in case one has flashed
// it will store posns of flashes for a single step to prevent repetition
function octoFlash(row, col, flashedPosns) {
    if (row < 0 || row >= inputData.length) return;
    if (col < 0 || col >= inputData[row].length) return;
    if (flashedPosns.includes(`(${row}, ${col})`)) return;

    // if current octo was 9 then set it to zero and inc its neighbors
    // as a consequence of it flashing
    if (inputData[row][col] > 9) {
        flashedPosns.push(`(${row}, ${col})`);

        inputData[row][col] = 0;
        octoFlash(row + 1, col, flashedPosns);
        octoFlash(row - 1, col, flashedPosns);
        octoFlash(row, col + 1, flashedPosns);
        octoFlash(row, col - 1, flashedPosns);

        octoFlash(row + 1, col + 1, flashedPosns);
        octoFlash(row + 1, col - 1, flashedPosns);
        octoFlash(row - 1, col + 1, flashedPosns);
        octoFlash(row - 1, col - 1, flashedPosns);

    }
    else {
        inputData[row][col]++;
        if (inputData[row][col] > 9)
            octoFlash(row, col, flashedPosns)
    }
}

function printOctos() {
    console.log();
    for (let i = 0; i < inputData.length; i++) {
        let rowStr = ''
        for (let j = 0; j < inputData[i].length; j++) {
            rowStr = rowStr.concat(inputData[i][j])
        }
        console.log(rowStr);
    }
}

